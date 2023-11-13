import flagsmith from "flagsmith";
import initFlagsmith from "~/core/flagsmith/hooks/init-flagsmith";
import { EventEmail } from "./types/event-email";

const getEventEmailText = (flagsmithTag: string) => {
  initFlagsmith();

  const valueString: string = flagsmith.getValue(flagsmithTag);
  const eventEmail: EventEmail = JSON.parse(valueString);

  return eventEmail;
};

export default getEventEmailText;
