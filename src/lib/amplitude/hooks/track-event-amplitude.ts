import { track } from "@amplitude/analytics-browser";
import Events from "~/lib/amplitude/events";
import initAmplitude from "./init-amplitude";

const trackEvent = async (eventName: Events) => {
  //* Init Amplitude API to track analytic-events
  await initAmplitude();

  track(eventName);
};

export default trackEvent;
