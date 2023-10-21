import { Timestamp } from "firebase/firestore";

export type Project = {
  name: string;
  language: string;
  status: string;
  userId: string;
  input: string;
  output: string;
  createdAt: Timestamp;
};
