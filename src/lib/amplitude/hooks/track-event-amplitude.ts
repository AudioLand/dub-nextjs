import { track } from "@amplitude/analytics-browser";
import Events from "~/lib/analytics/events";

const trackEvent = (eventName: Events) => {
  track(eventName);
};

export default trackEvent;
