import React, { useCallback, useMemo, useState } from "react";
import { z } from "zod";

export const loginFormSchema = z.object({
  username: z.string().nonempty({ message: "Username is required" }).min(6, {
    message:
      "Invalid username! Valid username should contain minimum 6 characters",
  }),
  password: z.string().nonempty({ message: "Password is required" }).min(6, {
    message:
      "Invalid password! Valid password should contain minimum 6 characters",
  }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
type LoginFormTouchedState = {
  [K in keyof LoginFormSchema]: boolean;
};

export default function useLoginForm() {
  // #region INTERNAL FORM STATES

  const [formState, setFormState] = useState<LoginFormSchema>({
    username: "",
    password: "",
  });

  const [isTouched, setIsTouched] = useState<LoginFormTouchedState>({
    username: false,
    password: false,
  });

  // #endregion

  // #region FORM HANDLERS

  const handleFieldChange = useCallback(
    (value: string, field: keyof LoginFormSchema) => {
      setFormState((prevState) => ({
        ...prevState,
        [field]: value,
      }));
      setIsTouched((prevState) => ({ ...prevState, [field]: true }));
    },
    []
  );

  const handleUsernameChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      handleFieldChange(evt.target.value, "username");
    },
    [handleFieldChange]
  );

  const handlePasswordChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      handleFieldChange(evt.target.value, "password");
    },
    [handleFieldChange]
  );

  const handleBlur = useCallback((field: keyof LoginFormSchema) => {
    setIsTouched((prevState) => ({ ...prevState, [field]: true }));
  }, []);

  // #endregion

  // #region ERROR VALIDATIONS

  const validateForm = useMemo(() => {
    return loginFormSchema.safeParse(formState);
  }, [formState]);

  const errors = useMemo(() => {
    if (validateForm.success) {
      return {};
    }

    return validateForm.error.flatten().fieldErrors;
  }, [validateForm]);

  const usernameError = useMemo(() => {
    if (errors.username && isTouched.username) {
      return errors.username[0];
    }

    return undefined;
  }, [errors, isTouched.username]);

  const passwordError = useMemo(() => {
    if (errors.password && isTouched.password) {
      return errors.password[0];
    }

    return undefined;
  }, [errors, isTouched.password]);

  // #endregion

  return {
    values: {
      isTouched,
      formState,
      errors,
      usernameError,
      passwordError,
    },
    handlers: {
      handleBlur,
      handleFieldChange,
      handleUsernameChange,
      handlePasswordChange,
    },
  };
}
