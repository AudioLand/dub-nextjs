import { init } from "@amplitude/analytics-browser";

const initAmplitude = async () => {
  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

  if (apiKey) {
    init(apiKey);
  } else {
    throw new Error("Amplitude API key is not defined");
  }
};

export default initAmplitude;
