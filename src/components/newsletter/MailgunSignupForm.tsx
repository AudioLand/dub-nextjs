import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { MAILING_LIST, mg } from "~/core/email/mailgun";
import Button from "~/core/ui/Button";
import TextField from "~/core/ui/TextField";

const EMAIL_FIELD_NAME = "email_address";

const MailgunSignupForm: React.FCC = ({ children }) => {
  const [success, setSuccess] = useState<boolean>(false);
  const mailingListMembers = mg.lists.members;

  const checkIfUserSubscribed = async (userEmail: string) => {
    try {
      return await mailingListMembers.getMember(MAILING_LIST, userEmail);
    } catch (e) {
      return undefined;
    }
  };

  const subscribeUser = async (userEmail: string) => {
    try {
      await mailingListMembers.createMember(MAILING_LIST, {
        address: userEmail,
        subscribed: true,
      });
      setSuccess(true);
    } catch (e) {
      toast.error("Something wrong, try later");
      setSuccess(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);
    const userEmail = data.get(EMAIL_FIELD_NAME)!.toString();

    const isSubscribed = await checkIfUserSubscribed(userEmail);
    if (!isSubscribed) {
      await subscribeUser(userEmail);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return <p>You&apos;re in! Thank you for subscribing.</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      method="POST"
      target="_blank"
      className="flex w-full flex-col justify-center space-y-2 lg:flex-row lg:space-y-0 lg:space-x-1.5"
    >
      <TextField.Input
        type="email"
        className="w-full 2xl:w-60"
        name={EMAIL_FIELD_NAME}
        aria-label="Your email address"
        placeholder="your@email.com"
        required
      />

      <Button>{children}</Button>
    </form>
  );
};

export default MailgunSignupForm;
