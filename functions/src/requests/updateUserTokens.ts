/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */

// firebase
import {log} from "firebase-functions/logger";
import {onRequest} from "firebase-functions/v2/https";

// infra
import {firestore} from "../infra/cloudFunctions";

// types
import {UpdateUserTokensRequestData} from "../types/updateUserTokensRequestData";

export const updateUserTokens = onRequest(async (request, response) => {
  try {
    const data: UpdateUserTokensRequestData = request.body;
    const organizationId = data.organization_id;
    const tokens = Number(data.tokens);
    log(`Got request body data. Start updating tokens to ${tokens} for user with organization id: ${organizationId}`);

    // Update project's status and translated file link
    const organizationRef = firestore.collection("organizations").doc(organizationId);
    const organizationSnap = await organizationRef.get();
    if (organizationSnap.exists) {
      const organizationData = organizationSnap.data();
      if (organizationData) {
        const organizationPrevTokens = Number(organizationData.usedTokensInSeconds) || 0;
        const newUsedTokensCount = organizationPrevTokens + tokens;
        organizationRef.update({
          usedTokensInSeconds: newUsedTokensCount,
        });
        log(`Organization with id: ${organizationId} was updated with { usedTokensInSeconds: ${newUsedTokensCount} }`);
        response.status(200).send("User tokens was updated successfully!!");
      }
    } else {
      log(`Organization with id ${organizationId} does not exist`);
      response.status(400).send(`Organization with id ${organizationId} does not exist`);
    }
  } catch (err: any) {
    response.send(`Error code: ${err.code} | Error message: ${err.message}`);
  }
});
