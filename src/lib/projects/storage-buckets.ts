import { isDevEnv } from "../is-dev-env";

export const ALEX_STORAGE_BUCKET = "audioland-dub-rask";
export const STORAGE_BUCKET = isDevEnv() ? "audioland-dub" : "audioland-dub-dev";
