import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { MAILING_LIST, mg } from "~/core/email/mailgun";
import Button from "~/core/ui/Button";
import TextField from "~/core/ui/TextField";

const EMAIL_FIELD_NAME = "email_address";

const MailgunSignupForm: React.FC<{ buttonLabel: string }> = ({ buttonLabel }) => {
  const [subscribed, setSubscribed] = useState<boolean>(false);
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
      setSubscribed(true);
    } catch (e) {
      toast.error("Something wrong, try later");
      setSubscribed(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const signUpFormData = new FormData(e.target as HTMLFormElement);
    const userEmail = signUpFormData.get(EMAIL_FIELD_NAME)!.toString();

    const isSubscribed = await checkIfUserSubscribed(userEmail);
    if (!isSubscribed) {
      await subscribeUser(userEmail);
    } else {
      setSubscribed(true);
    }
  };

  if (subscribed) {
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

      <Button>{buttonLabel}</Button>
    </form>
  );
};

export default MailgunSignupForm;
