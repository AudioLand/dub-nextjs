const PIPELINE_PRODUCTION_URL = "https://audioland.fly.dev";
const PIPELINE_DEVELOPMENT_URL = "http://localhost:8080";

const PIPELINE_URL =
  process.env.NODE_ENV == "development" ? PIPELINE_DEVELOPMENT_URL : PIPELINE_PRODUCTION_URL;

export default PIPELINE_URL;
