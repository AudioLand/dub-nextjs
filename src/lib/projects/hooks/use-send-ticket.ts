import { useCallback } from "react";
import { toast } from "sonner";
import { INTERCOM_BEARER_TOKEN, INTERCOM_TICKETS_API_URL } from "../intercom";
import { TicketErrorType } from "../statuses";

const useSendTicket = () => {
  return useCallback(
    (userId: string, userEmail: string, projectId: string, errorType: TicketErrorType) => {
      const error = errorType.replace("Error", "");

      fetch(INTERCOM_TICKETS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "Intercom-Version": "2.10",
          Authorization: `Bearer ${INTERCOM_BEARER_TOKEN}`,
        },
        body: JSON.stringify({
          contacts: [
            {
              id: userId,
            },
          ],
          ticket_attributes: {
            title: `${error} Error`,
            description: `There is a problem while ${error}`,
            email: userEmail,
            project: projectId,
          },
        }),
      }).then(() => {
        toast.success("Your report was sent");
      });
    },
    [],
  );
};

export default useSendTicket;
