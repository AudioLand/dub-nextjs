import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token: string) => {
  const decodedToken = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000); // Convert current time to seconds

  const expirationTime = decodedToken.exp;

  const isExpired = expirationTime && expirationTime < currentTime;

  return isExpired;
};
