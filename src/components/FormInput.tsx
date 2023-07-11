import clsx from "clsx";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FieldPath, FieldValues, UseFormRegister } from "react-hook-form";

type Props<TFieldValues extends FieldValues> = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "name"
> & {
  name: FieldPath<TFieldValues>;
  label?: string;
  className?: string;
  error?: string;
  register: UseFormRegister<TFieldValues>;
};

function FormInput<TFieldValues extends FieldValues>({
  label,
  className,
  error,
  register,
  name,
  ...rest
}: Props<TFieldValues>) {
  return (
    <div className={clsx("flex flex-col", className)}>
      <label htmlFor={label} className="text-gray-900 text-base font-bold mb-1">
        {label}
      </label>
      <input
        {...rest}
        className={clsx(
          "p-2 w-full",
          "border border-gray-400 rounded text-base text-gray-700",
          "focus:outline-blue-500 focus:border-none",
          error && "border-red-500 focus:outline-red-500"
        )}
        {...register(name)}
      />
      <span className="text-xs mt-1 text-red-500">{error}</span>
    </div>
  );
}

export default FormInput;
