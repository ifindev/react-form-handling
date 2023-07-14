import clsx from "clsx";
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useMemo,
  useState,
} from "react";
import { Icon } from "./atom";

type Props = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "className"
> & {
  label?: string;
  error?: string;
  className?: string;
};

function FormInput({ label, className, error, name, type, ...rest }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = useMemo(
    () => (type !== "password" ? type : showPassword ? "text" : type),
    [showPassword, type]
  );

  return (
    <div className={clsx("flex flex-col relative", className)}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        {...rest}
        type={inputType}
        className={clsx(
          "p-2 w-full",
          "border border-gray-400 rounded text-base text-gray-700",
          "focus:outline-blue-500 focus:border-none",
          error && "border-red-500 focus:outline-red-500",
          type === "password" && "pr-11"
        )}
      />
      {type === "password" && (
        <button
          aria-label="toggle password"
          className="absolute top-2 right-3"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <Icon.EyeClose /> : <Icon.EyeOpen />}
        </button>
      )}
      {error && <span>{error}</span>}
    </div>
  );
}

export default FormInput;
