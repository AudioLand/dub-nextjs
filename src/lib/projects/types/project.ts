import { Timestamp } from "firebase/firestore";

export type Project = {
  name: string;
  language: string;
  status: string;
  userId: string;
  createdAt: Timestamp;
};
