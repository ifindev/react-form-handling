import clsx from "clsx";
import React, {
  DetailedHTMLProps,
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
} from "react";

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  className?: string;
  error?: string;
};

function FormInput(
  { label, className, error, ...rest }: Props,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className={clsx("flex flex-col", className)}>
      <label htmlFor={label} className="text-gray-900 text-base ">
        {label}
      </label>
      <input
        ref={ref}
        {...rest}
        name={label}
        type="text"
        className={clsx(
          "p-2 w-full",
          "border border-gray-400 rounded text-base text-gray-700",
          "focus:outline-blue-500 focus:border-none",
          error && "border-red-500 focus:outline-red-500"
        )}
      />
      <span className="text-xs mt-1 text-red-500">{error}</span>
    </div>
  );
}

export default forwardRef(FormInput);
