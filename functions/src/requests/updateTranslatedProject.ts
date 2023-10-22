/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */

// firebase
import {log} from "firebase-functions/logger";
import {onRequest} from "firebase-functions/v2/https";

// infra
import {firestore} from "../infra/cloudFunctions";

// types
import {Project} from "../types/project";

export const updateTranslatedProject = onRequest(async (request, response) => {
  try {
    const data: Project = request.body;
    const projectId = data.id;
    const newStatus = data.status;
    const translatedFileLink = data.translatedFileLink;
    log(`Got request body data. Start updating project with id: ${projectId}`);

    // Update project's status and translated file link
    const projectRef = firestore.collection("projects").doc(projectId);
    const projectData = await projectRef.get();
    if (projectData.exists) {
      projectRef.update({
        status: newStatus,
        translatedFileLink: translatedFileLink,
      });
      log(`Project with id: ${projectId} was updated with { status: ${newStatus}, translatedFileLink: ${translatedFileLink} }`);
      response.status(200).send("Translated project status updated successfully!!");
    } else {
      log(`Project with id ${projectId} does not exist`);
      response.status(400).send(`Project with id ${projectId} does not exist`);
    }
  } catch (err: any) {
    response.send(`Error code: ${err.code} | Error message: ${err.message}`);
  }
});
