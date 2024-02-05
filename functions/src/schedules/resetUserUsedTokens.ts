/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */

// firebase
import {Timestamp} from "firebase-admin/firestore";
import {onSchedule} from "firebase-functions/v2/scheduler";
import {firestore} from "../infra/cloudFunctions";

// constants
import {log} from "firebase-functions/logger";
import {DELAY_TO_CHECK_USERS_TOKENS} from "../constants/reset-tokens-time";

export const resetUserUsedTokens = onSchedule(
  DELAY_TO_CHECK_USERS_TOKENS,
  async () => {
    try {
      log("Reseting users used tokens...");
      // Get all organizations
      const organizationsRef = firestore.collection("organizations");
      const organizationsSnapshot = await organizationsRef.get();

      // Loop through each organization
      organizationsSnapshot.forEach(async (organizationDoc) => {
        const organizationData = organizationDoc.data();
        log(`Try to reset token for user with id ${organizationDoc.id}...`);

        // Check if the organization has the nextTokenResetDate field
        if (!organizationData.nextTokenResetDate) {
          log(`User with id ${organizationDoc.id} do not need to reset tokens.`);
          return;
        }

        // Get today day & month
        const todayDate = new Date();
        const todayDay = todayDate.getDate();
        const todayMonth = todayDate.getMonth();

        // Get next reset day & month
        const nextTokenResetTimestamp = Number(organizationData.nextTokenResetDate);
        const nextTokenResetDate = new Date(nextTokenResetTimestamp);
        const nextTokenResetDay = nextTokenResetDate.getDate();
        const nextTokenResetMonth = nextTokenResetDate.getMonth();

        // Reset user tokens if nextTokenResetDate is today
        const userNeedToResetTokens =
          todayDay === nextTokenResetDay && todayMonth === nextTokenResetMonth;
        if (!userNeedToResetTokens) {
          log(`Today (${todayDate.toDateString()}) is not valid date (${nextTokenResetDate.toDateString()}).`);
          return;
        }

        // Reset tokens
        await organizationDoc.ref.update({
          usedTokensInSeconds: 0,
        });
        log(`User with id ${organizationDoc.id} tokens reset successful at ${todayDate.toDateString()}.`);

        // Update next token reset date
        const newNextTokenResetDate = new Date();
        newNextTokenResetDate.setMonth(nextTokenResetMonth + 1);
        const newNextTokenResetTimestamp = Timestamp.fromDate(newNextTokenResetDate);
        await organizationDoc.ref.update({
          nextTokenResetDate: newNextTokenResetTimestamp.toMillis(),
        });
        log(
          `User with id ${organizationDoc.id} next reset date updated to ${newNextTokenResetDate.toDateString()}.`,
        );
      });
    } catch (err: any) {
      log(`Error code: ${err.code} | Error message: ${err.message}`);
    }
  },
);
