import React, { useCallback, useMemo } from "react";
import { z } from "zod";
import { FormSchema } from "../../types/form.type";
import { zodValidate } from "../../utils/form/form.util";
import useForm from "../use-form/use-form.hook";

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

export type LoginFormSchema = FormSchema<typeof loginFormSchema>;
type LoginFormTouchedState = {
  [K in keyof LoginFormSchema]: boolean;
};

export default function useLoginForm() {
  // #region FORM STATE & HANDLERS

  const initialFormValues: LoginFormSchema = {
    username: "",
    password: "",
  };
  const initialTouchedState: LoginFormTouchedState = {
    username: false,
    password: false,
  };

  const form = useForm({
    schema: loginFormSchema,
    initialFormValues,
    initialTouchedState,
  });

  // #endregion

  // #region FORM HANDLERS

  const handleUsernameChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      form.handlers.handleChange(evt.target.value, "username");
    },
    [form.handlers]
  );

  const handlePasswordChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      form.handlers.handleChange(evt.target.value, "password");
    },
    [form.handlers]
  );
  // #endregion

  // #region ERROR VALIDATIONS

  const errors = useMemo(
    () => zodValidate(loginFormSchema, form.values.formData),
    [form.values]
  );

  const usernameError = useMemo(() => {
    if (errors.username && form.values.isTouched.username) {
      return errors.username[0];
    }

    return undefined;
  }, [errors, form.values.isTouched.username]);

  const passwordError = useMemo(() => {
    if (errors.password && form.values.isTouched.password) {
      return errors.password[0];
    }

    return undefined;
  }, [errors, form.values.isTouched.password]);

  // #endregion

  return {
    values: {
      isTouched: form.values.isTouched,
      formState: form.values.formData,
      errors,
      usernameError,
      passwordError,
    },
    handlers: {
      handleBlur: form.handlers.handleBlur,
      handleChange: form.handlers.handleChange,
      handleUsernameChange,
      handlePasswordChange,
    },
  };
}
