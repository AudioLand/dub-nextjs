import {track} from "@amplitude/analytics-browser";


const trackEvent = (eventName: string) => {
    track(eventName);
}

export default trackEvent