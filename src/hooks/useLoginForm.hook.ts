import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, ValidationMode, useForm } from "react-hook-form";
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

type LoginFormSchema = z.infer<typeof loginFormSchema>;
export type LoginFormData = LoginFormSchema & FieldValues;

type UseLoginFormOptions = {
  defaultValues: LoginFormSchema;
  validationMode: keyof ValidationMode;
};

export default function useLoginForm(options?: Partial<UseLoginFormOptions>) {
  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors, defaultValues },
  } = useForm<LoginFormData>({
    mode: options?.validationMode,
    resolver: zodResolver(loginFormSchema),
    defaultValues: options?.defaultValues,
  });

  return {
    setValue,
    getValues,
    register,
    handleSubmit,
    errors,
    defaultValues,
  };
}
