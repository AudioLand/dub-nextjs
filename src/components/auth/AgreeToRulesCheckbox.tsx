import React from "react";
import Link from "next/link";

import configuration from "~/configuration";

const termsOfServicePath = configuration.paths.termsOfService;
const privacyPolicyPath = configuration.paths.privacyPolicy;

type AgreeToRulesCheckboxProps = {
  setCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
};

const AgreeToRulesCheckbox: React.FCC<AgreeToRulesCheckboxProps> = ({ setCheckbox }) => {
  return (
    <p className={"flex space-x-3 mb-3"}>
      <input
        type="checkbox"
        className="w-8"
        defaultChecked={true}
        onChange={(e) => setCheckbox(e.target.checked)}
      />
      <span>
        I agree to Audioland`s{" "}
        <Link
          className={"text-primary-800 hover:underline dark:text-primary"}
          href={privacyPolicyPath}
        >
          Privacy policy
        </Link>{" "}
        and{" "}
        <Link
          className={"text-primary-800 hover:underline dark:text-primary"}
          href={termsOfServicePath}
        >
          Terms of Use
        </Link>
      </span>
    </p>
  );
};

export default AgreeToRulesCheckbox;
