import useSWRMutation from "swr/mutation";
import { useApiRequest } from "~/core/hooks/use-api";

interface SendEmailProp {
  userEmail: string;
  textsFlagId: string;
}

const useSendEmail = () => {
  const fetcher = useApiRequest<void, SendEmailProp>();

  return useSWRMutation("/api/emails/send", (path, { arg: body }: { arg: SendEmailProp }) => {
    return fetcher({
      path,
      body,
    });
  });
};

export default useSendEmail;
