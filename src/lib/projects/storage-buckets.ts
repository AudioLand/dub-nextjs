import configuration from "~/configuration";

export const RASK_STORAGE_BUCKET = "audioland-dub-rask";
export const STORAGE_BUCKET =
  configuration.environment === "production" ? "audioland-dub" : "audioland-dub-dev";
