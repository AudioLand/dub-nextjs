import { FormEvent, useState } from "react";
import { MAILING_LIST, mg } from "~/core/email/mailgun";
import Button from "~/core/ui/Button";
import TextField from "~/core/ui/TextField";

const MailgunSignupForm: React.FCC = ({ children }) => {
  const [success, setSuccess] = useState<boolean>(false);

  const emailFieldName = "email_address";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);
    const userEmail = data.get(emailFieldName)!.toString();
    const mailingListMembers = mg.lists.members;

    try {
      const subscribedUser = await mailingListMembers.getMember(MAILING_LIST, userEmail);

      if (subscribedUser) {
        setSuccess(true);
      }
    } catch (e) {
      try {
        await mailingListMembers.createMember(MAILING_LIST, {
          address: userEmail,
          subscribed: true,
        });
        setSuccess(true);
      } catch (e) {
        console.error(e);
        setSuccess(false);
      }
    }
  };

  if (success) {
    return <p>You&apos;re in! Thank you for subscribing.</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      method={"POST"}
      target="_blank"
      className={`flex w-full flex-col justify-center space-y-2 lg:flex-row lg:space-y-0 lg:space-x-1.5`}
    >
      <TextField.Input
        type="email"
        className="w-full 2xl:w-60"
        name={emailFieldName}
        aria-label="Your email address"
        placeholder="your@email.com"
        required
      />

      <Button>{children}</Button>
    </form>
  );
};

export default MailgunSignupForm;
