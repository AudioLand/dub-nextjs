// firebase
import { Timestamp } from "firebase/firestore";

// types
import PROJECT_STATUSES from "../statuses";

export type Project = {
  name: string;
  targetLanguage: string;
  targetVoice: number;
  status: PROJECT_STATUSES;
  numberOfSpeakers: string;
  userId: string;
  originalFileLink: string;
  translatedFileLink: string;
  createdAt: Timestamp;
};
