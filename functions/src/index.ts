// firebase
import * as logger from "firebase-functions/logger";
import {onRequest} from "firebase-functions/v2/https";

// functions
import {updateTranslatedProject} from "./requests/updateTranslatedProject";

const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export {
  helloWorld,

  updateTranslatedProject,
};
