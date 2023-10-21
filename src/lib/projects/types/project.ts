import { Timestamp } from "firebase/firestore";

export type Project = {
  name: string;
  targetLanguage: string;
  status: string;
  userId: string;
  createdAt: Timestamp;
};
