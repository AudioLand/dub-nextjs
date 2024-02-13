import { jwtDecode } from "jwt-decode";
import { AppSumoReqData } from "../types/sumo-ling-data";

export const getSumolingDataFromToken = (token: string) => {
  const sumolingData = jwtDecode(token) as AppSumoReqData;

  return {
    ...sumolingData,
  };
};
