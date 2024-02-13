import { OrganizationSubscription } from "~/lib/organizations/types/organization-subscription";
import { EmailTemplate } from "../templates";
import { getProjectErrorEmailTemplate } from "../templates/project-error";
import { getResetPasswordEmailTemplate } from "../templates/reset-password";
import { getSubscriptionAutoRenewEmailTemplate } from "../templates/subscription-auto-renew";
import { getSubscriptionExpirationEmailTemplate } from "../templates/subscription-expiration";
import { getSuccessfulProjectCompletionEmailTemplate } from "../templates/successful-project-completion";
import { getSuccessfulSubscriptionEmailTemplate } from "../templates/successful-subscription";
import { getSumolingActivationEmailTemplate } from "../templates/sumo-ling-activation";
import { getUnsuccessfulPaymentEmailTemplate } from "../templates/unsuccessful-payment";
import { getWelcomeEmailTemplate } from "../templates/welcome";

export interface EmailTemplateArgs {
  returnUrl?: string;
  subscription?: OrganizationSubscription;
  activationUrl?: string;
}

const templatesWithArgs = [
  EmailTemplate.ResetPassword,
  EmailTemplate.SubscriptionAutoRenew,
  EmailTemplate.SuccessfulSubscription,
  EmailTemplate.SumolingActivation,
];

export const getEventEmailTemplate = (emailTemplate: EmailTemplate, args?: EmailTemplateArgs) => {
  if (templatesWithArgs.includes(emailTemplate)) {
    if (!args) {
      throw new Error(`Email template ${emailTemplate} require some arguments.`);
    }
  }

  switch (emailTemplate) {
    case EmailTemplate.ProjectError:
      return getProjectErrorEmailTemplate();

    case EmailTemplate.ResetPassword:
      if (!args?.returnUrl) {
        throw new Error(`ResetPassword email template require returnUrl argument.`);
      }
      return getResetPasswordEmailTemplate(args.returnUrl);

    case EmailTemplate.SubscriptionAutoRenew:
      if (!args?.subscription) {
        throw new Error(`SubscriptionAutoRenew email template require subscription argument.`);
      }
      return getSubscriptionAutoRenewEmailTemplate(args.subscription);

    case EmailTemplate.SubscriptionExpiration:
      return getSubscriptionExpirationEmailTemplate();

    case EmailTemplate.SuccessfulProjectCompletion:
      return getSuccessfulProjectCompletionEmailTemplate();

    case EmailTemplate.SuccessfulSubscription:
      if (!args?.subscription) {
        throw new Error(`SuccessfulSubscription email template require subscription argument.`);
      }
      return getSuccessfulSubscriptionEmailTemplate(args.subscription);

    // case EmailTemplate.SuccessfulTokenPurchase:
    //   return getSuccessfulTokenPurchaseEmailTemplate();

    case EmailTemplate.UnsuccessfulPayment:
      return getUnsuccessfulPaymentEmailTemplate();

    case EmailTemplate.Welcome:
      return getWelcomeEmailTemplate();

    case EmailTemplate.SumolingActivation:
      if (!args?.activationUrl) {
        throw new Error(`SumolingActivation email template require activationUrl argument.`);
      }
      return getSumolingActivationEmailTemplate(args.activationUrl);

    default:
      throw new Error(`Unknown email template ${emailTemplate}.`);
  }
};
