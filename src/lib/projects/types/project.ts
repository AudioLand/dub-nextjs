// firebase
import { Timestamp } from "firebase/firestore";

// types
import PROJECT_STATUSES from "../statuses";

export type Project = {
  name: string;
  targetLanguage: string;
  status: PROJECT_STATUSES;
  userId: string;
  originalFileLink: string;
  translatedFileLink: string;
  createdAt: Timestamp;
};
