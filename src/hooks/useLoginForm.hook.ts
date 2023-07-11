import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  SubmitHandler,
  ValidationMode,
  useForm,
} from "react-hook-form";
import { z } from "zod";

const LoginFormSchema = z.object({
  username: z.string().nonempty({ message: "Username is required" }).min(6, {
    message:
      "Invalid username! Valid username should contain minimum 6 characters",
  }),
  password: z.string().nonempty({ message: "Password is required" }).min(6, {
    message:
      "Invalid password! Valid password should contain minimum 6 characters",
  }),
});

type LoginForm = z.infer<typeof LoginFormSchema>;
export type LoginFormData = LoginForm & FieldValues;

type UseLoginFormOptions = {
  defaultValues: LoginForm;
  validationMode: keyof ValidationMode;
};

export default function useLoginForm(options?: Partial<UseLoginFormOptions>) {
  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues },
  } = useForm<LoginFormData>({
    mode: options?.validationMode,
    resolver: zodResolver(LoginFormSchema),
    defaultValues: options?.defaultValues,
  });

  const onSubmit: SubmitHandler<LoginForm> = (data) =>
    alert(`Data: ${JSON.stringify(data)}`);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    defaultValues,
  };
}
