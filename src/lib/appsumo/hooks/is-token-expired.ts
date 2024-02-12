import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token: string) => {
  const decodedToken = jwtDecode(token);

  // Convert current time to seconds
  const currentTime = Math.floor(Date.now() / 1000);

  const expirationTime = decodedToken.exp;
  const isExpired = expirationTime && expirationTime < currentTime;

  return isExpired;
};
