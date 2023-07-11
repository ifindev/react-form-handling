import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "./components/FormInput";

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
type LoginFormData = LoginForm & FieldValues;

function App() {
  // #REGION React Hook Form

  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues },
  } = useForm<LoginFormData>({
    mode: "onBlur",
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = (data) =>
    console.log("data", data);

  // #ENDREGION

  return (
    <div className="p-4 bg w-[300px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput<LoginFormData>
          type="text"
          name="username"
          label="Username"
          placeholder="Username"
          error={errors.username?.message}
          register={register}
          defaultValue={defaultValues?.username}
        />
        <FormInput<LoginFormData>
          className="mt-2"
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
          error={errors.password?.message}
          register={register}
          defaultValue={defaultValues?.password}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
