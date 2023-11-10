import { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import { z } from "zod";

import configuration from "~/configuration";
import logger from "~/core/logger";

import { getApiRefererPath } from "~/core/generic/get-api-referer-path";
import { HttpStatusCode } from "~/core/generic/http-status-code.enum";
import { withAuthedUser } from "~/core/middleware/with-authed-user";
import { withMethodsGuard } from "~/core/middleware/with-methods-guard";
import { withPipe } from "~/core/middleware/with-pipe";
import { canChangeBilling } from "~/lib/organizations/permissions";
import { getUserRoleByOrganization } from "~/lib/server/organizations/memberships";
import { getOrganizationByCustomerId } from "~/lib/server/organizations/subscriptions";
import { createBillingPortalSession } from "~/lib/stripe/create-billing-portal-session";
const SUPPORTED_HTTP_METHODS: HttpMethod[] = ["POST"];

async function billingPortalRedirectHandler(req: NextApiRequest, res: NextApiResponse) {
  const { firebaseUser, headers } = req;
  const userId = firebaseUser.uid;
  const schemaResult = getBodySchema().safeParse(req.body);

  if (!schemaResult.success) {
    return redirectToErrorPage(req, res);
  }

  const { customerId, subscriptionId, redirectToStripePaywall } = schemaResult.data;

  // we check that the user is authorized to access the portal
  const canAccess = await getUserCanAccessCustomerPortal({
    customerId,
    userId,
  });

  if (!canAccess) {
    return redirectToErrorPage(req, res);
  }

  try {
    const returnUrl = headers.referer || headers.origin || configuration.paths.appHome;

    const { url } = await createBillingPortalSession({
      returnUrl,
      customerId,
    });

    //* Convert '1' to true or '0' to false
    const needToRedirectToPaywall = Boolean(Number(redirectToStripePaywall));

    const finalUrl = needToRedirectToPaywall
      ? `${url}/subscriptions/${subscriptionId}/update`
      : url;

    res.redirect(HttpStatusCode.SeeOther, finalUrl);
  } catch (error) {
    return onError(req, res, error);
  }
}

export default async function stripePortalHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await withPipe(withMethodsGuard(SUPPORTED_HTTP_METHODS), withAuthedUser)(req, res);

    return billingPortalRedirectHandler(req, res);
  } catch (error) {
    return onError(req, res, error);
  }
}

/**
 * @name getUserCanAccessCustomerPortal
 * @description Returns whether a user {@link userId} has access to the
 * Stripe portal of an organization with customer ID {@link customerId}
 */
async function getUserCanAccessCustomerPortal(params: { customerId: string; userId: string }) {
  try {
    const organization = await getOrganizationByCustomerId(params.customerId);

    const userRole = await getUserRoleByOrganization({
      organizationId: organization.id,
      userId: params.userId,
    });

    if (userRole === undefined) {
      return false;
    }

    return canChangeBilling(userRole);
  } catch (e) {
    logger.error(e, `Could not retrieve user role`);

    return false;
  }
}

function getBodySchema() {
  return z.object({
    customerId: z.string(),
    subscriptionId: z.string(),
    redirectToStripePaywall: z.string(),
  });
}

function redirectToErrorPage(req: NextApiRequest, res: NextApiResponse) {
  const referrerPath = getApiRefererPath(req.headers);
  const url = join(referrerPath, `?error=true`);

  return res.redirect(url);
}

function onError(req: NextApiRequest, res: NextApiResponse, error: unknown) {
  logger.error(error, `Stripe Billing Portal redirect error`);

  return redirectToErrorPage(req, res);
}
