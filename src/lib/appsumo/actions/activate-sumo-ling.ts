import { getAuth } from "firebase-admin/auth";
import { sign } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "~/lib/appsumo/credentials";
import { SumolingData } from "../types/sumo-ling-data";

const generateJWTTokenWithEmail = ({
  planId,
  uuid,
  activationEmail,
  invoiceItemUUID,
}: SumolingData) => {
  const token = sign(
    {
      planId,
      uuid,
      activationEmail,
      invoiceItemUUID,
    },
    JWT_SECRET_KEY,
  );
  return token;
};

export const activateSumoling = async ({
  planId,
  uuid,
  activationEmail,
  invoiceItemUUID,
}: SumolingData) => {
  const auth = getAuth();

  // Check if user with this uuid exists
  try {
    const user = await auth.getUser(uuid);

    if (user) {
      return null;
    }
  } catch (err: any) {
    const token = generateJWTTokenWithEmail({
      planId,
      uuid,
      activationEmail,
      invoiceItemUUID,
    });

    return token;
  }
};
