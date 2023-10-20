import { Timestamp } from "firebase/firestore";

export type Project = {
  name: string;
  // TODO: add languages we use
  language: string;
  // TODO: add project statuses
  status: string;
  userId: string;
  createdAt: Timestamp;
};
