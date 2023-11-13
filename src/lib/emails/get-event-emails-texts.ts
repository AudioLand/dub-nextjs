import flagsmith from "flagsmith";
import { EventEmail } from "./types/event-email";

const getEventEmailText = (flagsmithTag: string) => {
  const valueString: string = flagsmith.getValue(flagsmithTag);
  const eventEmail: EventEmail = JSON.parse(valueString);

  return eventEmail;
};

export default getEventEmailText;
