import React from "react";
import { SubmitHandler } from "react-hook-form";
import FormInput from "./components/FormInput";
import useLoginFormRHF, {
  LoginFormData,
} from "./hooks/useLoginFormRHF/useLoginFormRHF.hook";

function App() {
  // #REGION React Hook Form

  const loginForm = useLoginFormRHF({ validationMode: "onBlur" });

  const onSubmit: SubmitHandler<LoginFormData> = (data) =>
    alert(`Data: ${JSON.stringify(data)}`);

  // #ENDREGION

  return (
    <div className="p-4 bg w-[300px]">
      <form onSubmit={loginForm.handleSubmit(onSubmit)}>
        <FormInput<LoginFormData>
          type="text"
          name="username"
          label="Username"
          placeholder="Username"
          error={loginForm.errors.username?.message}
          register={loginForm.register}
          defaultValue={loginForm.defaultValues?.username}
        />
        <FormInput<LoginFormData>
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

export default App;
