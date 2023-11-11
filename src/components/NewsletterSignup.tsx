import configuration from "~/configuration";
import Heading from "~/core/ui/Heading";
import EmailOctopusSignupForm from "./newsletter/EmailOctopusSignupForm";

function NewsletterSignup() {
  const emailOctopusFormId = configuration.site.emailOctopusFormId;
  if (!emailOctopusFormId) {
    throw new Error("Email Octopus form id is not defined");
  }

  return (
    <div className={"flex flex-col space-y-4"}>
      <div>
        <Heading type={6}>Subscribe to our Newsletter</Heading>

        <div className={"text-sm text-gray-500 dark:text-gray-400"}>
          Get the latest updates from our team.
        </div>
      </div>

      <div>
        <EmailOctopusSignupForm formId={emailOctopusFormId}>Subscribe</EmailOctopusSignupForm>
      </div>
    </div>
  );
}

export default NewsletterSignup;
