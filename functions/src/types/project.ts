// types
import {Timestamp} from "firebase-admin/firestore";
import PROJECT_STATUSES from "./statuses";

export type Project = {
  id: string;
  name: string;
  targetLanguage: string;
  status: PROJECT_STATUSES;
  userId: string;
  originalFileLink: string;
  translatedFileLink: string;
  createdAt: Timestamp;
};
