import React from "react";
import { SubmitHandler } from "react-hook-form";
import FormInputRHF from "../../components/form-input-rhf";
import useLoginFormRHF, {
  LoginFormData,
} from "../../hooks/use-login-form-rhf/use-login-form-rhf";

export default function LoginRHFView() {
  // #REGION React Hook Form

  const loginForm = useLoginFormRHF({ validationMode: "onBlur" });

  const onSubmit: SubmitHandler<LoginFormData> = (data) =>
    alert(`Data: ${JSON.stringify(data)}`);

  // #ENDREGION

  return (
    <div className="p-4 bg w-[300px]">
      <form onSubmit={loginForm.handleSubmit(onSubmit)}>
        <FormInputRHF<LoginFormData>
          type="text"
          name="username"
          label="Username"
          placeholder="Username"
          error={loginForm.errors.username?.message}
          register={loginForm.register}
          defaultValue={loginForm.defaultValues?.username}
        />
        <FormInputRHF<LoginFormData>
          className="mt-2"
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
          error={loginForm.errors.password?.message}
          register={loginForm.register}
          defaultValue={loginForm.defaultValues?.password}
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
