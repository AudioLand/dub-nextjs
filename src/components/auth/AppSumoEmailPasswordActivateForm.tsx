import { Trans, useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";

import Button from "~/core/ui/Button";
import If from "~/core/ui/If";
import TextField from "~/core/ui/TextField";

const AppSumoEmailPasswordActivateForm: React.FCC<{
  onSubmitForm: (params: { email: string; password: string; repeatPassword: string }) => unknown;
  loading: boolean;
  email: string;
  redirecting: boolean;
}> = ({ onSubmitForm, loading, email, redirecting }) => {
  const { t } = useTranslation();

  const { register, handleSubmit, watch, formState } = useForm({
    defaultValues: {
      email: email,
      password: "",
      repeatPassword: "",
    },
  });

  const errors = formState.errors;
  const emailControl = register("email", { required: true });

  const passwordControl = register("password", {
    required: true,
    minLength: {
      value: 6,
      message: t(`auth:passwordLengthError`),
    },
  });

  const passwordValue = watch(`password`);

  const repeatPasswordControl = register("repeatPassword", {
    required: true,
    minLength: {
      value: 6,
      message: t(`auth:passwordLengthError`),
    },
    validate: (value) => {
      if (value !== passwordValue) {
        return t(`auth:passwordsDoNotMatch`);
      }

      return true;
    },
  });

  return (
    <form className={"w-full"} onSubmit={handleSubmit(onSubmitForm)}>
      <div className={"flex-col space-y-4"}>
        {/* Email Field */}
        <TextField>
          <TextField.Label>
            <Trans i18nKey={"common:emailAddress"} />

            <TextField.Input
              {...emailControl}
              data-cy={"email-input"}
              required
              type="email"
              disabled
            />

            <TextField.Error error={errors.email?.message} />
          </TextField.Label>
        </TextField>

        {/* Password Field */}
        <TextField>
          <TextField.Label>
            <Trans i18nKey={"common:password"} />

            <TextField.Input
              {...passwordControl}
              data-cy={"password-input"}
              required
              type="password"
              placeholder={""}
            />

            <TextField.Hint>
              <Trans i18nKey={"auth:passwordHint"} />
            </TextField.Hint>

            <TextField.Error error={errors.password?.message} />
          </TextField.Label>
        </TextField>

        {/* Repeat Password Field */}
        <TextField>
          <TextField.Label>
            <Trans i18nKey={"auth:repeatPassword"} />

            <TextField.Input
              {...repeatPasswordControl}
              data-cy={"repeat-password-input"}
              required
              type="password"
              placeholder={""}
            />

            <TextField.Hint>
              <Trans i18nKey={"auth:repeatPasswordHint"} />
            </TextField.Hint>

            <TextField.Error error={errors.repeatPassword?.message} />
          </TextField.Label>
        </TextField>

        <div>
          <Button
            data-cy={"auth-submit-button"}
            className={"w-full"}
            type="submit"
            disabled={redirecting || loading}
            loading={loading}
          >
            <If condition={loading} fallback={<span>Activate</span>}>
              Activating...
            </If>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AppSumoEmailPasswordActivateForm;
