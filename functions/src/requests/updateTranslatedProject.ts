/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */

// firebase
import {onRequest} from "firebase-functions/v2/https";

// infra
import {firestore} from "../infra/cloudFunctions";

// types
import {Project} from "../types/project";

export const updateTranslatedProject = onRequest((request, response) => {
  try {
    const data: Project = request.body;
    const projectId = data.id;
    const status = data.status;
    const translatedFileLink = data.translatedFileLink;

    // Update project's status and translated file link
    const projectRef = firestore.collection("projects").doc(projectId);
    projectRef.update({
      status: status,
      translatedFileLink: translatedFileLink,
    });

    response.status(200).send("Translated project status updated successfully!");
  } catch (err: any) {
    response.status(400).send(`Error code: ${err.code} | Error message: ${err.message}`);
  }
});
