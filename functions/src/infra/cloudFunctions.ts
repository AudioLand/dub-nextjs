import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const config = functions.config();

admin.initializeApp(config.firebase);

export const firestore = admin.firestore();
