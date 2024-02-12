import { jwtDecode } from "jwt-decode";
import { SumolingData } from "../types/sumo-ling-data";

export const getSumolingDataFromToken = (token: string) => {
  const decodedToken = jwtDecode(token) as SumolingData;
  console.log("token data", decodedToken);

  return decodedToken;
};
