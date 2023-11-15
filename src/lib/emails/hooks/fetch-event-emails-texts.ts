import flagsmith from "flagsmith";

// hooks
import initFlagsmith from "~/core/flagsmith/hooks/init-flagsmith";

// types
import { EventEmail } from "../types/event-email";

const fetchEventEmailText = async (textsFlagId: string) => {
  await initFlagsmith();

  const valueString: string = flagsmith.getValue(textsFlagId);
  try {
    const eventEmail: EventEmail = JSON.parse(valueString);
    return eventEmail;
  } catch (error: any) {
    throw new Error("Event email texts is null, cannot fetch flagsmith");
  }
};

export default fetchEventEmailText;
