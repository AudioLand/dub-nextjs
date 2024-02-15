import configuration from "~/configuration";

export const isDevEnv = () => {
  return configuration.environment === "production";
};
