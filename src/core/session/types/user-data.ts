/**
 * This interface represents the user record in Firestore
 * Not to be confused with {@link User} defined in Firebase Auth
 * This data is always present in {@link UserSession}.
 *
 * Use this interface for any more data you may want to add to a User record.
 */
export interface UserData {
	//^ All fields should be optional, because of complete-onboarding.ts file in 45 line
	id?: string;
	role?: number;
}
