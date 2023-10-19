import { Timestamp } from "firebase/firestore";

export interface UserProject {
	name: string;
	// TODO: add languages we use
	language: string;
	// TODO: add project statuses
	status: string;
	userId: string;
	createdAt: Timestamp;
}
