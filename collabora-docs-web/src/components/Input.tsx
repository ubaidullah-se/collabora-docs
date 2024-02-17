import React, { useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  type: string;
  name?: string;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  label?: string;
  showLabel?: boolean;
  wrapperClassName?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  errors?: Record<string, any>;
  touched?: Record<string, any>;
  showEyeIcon?: boolean;
};

export default function Input({
  name = "",
  label,
  showLabel = true,
  className,
  wrapperClassName,
  labelClassName,
  errorClassName,
  value,
  type,
  errors,
  touched,
  onChange,
  onBlur,
  showEyeIcon = true,
  ...props
}: Props) {
  const [inputType, setInputType] = useState<string>(
    type == "number" ? "text" : type
  );
  const [showPassword, setShowPassword] = useState<boolean>(
    type === "password"
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const fieldNames = name.split(".");

  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const error = fieldNames
    .reduce((errorObj, fieldName) => errorObj && errorObj[fieldName], errors)
    ?.toString();

  const touch = fieldNames.reduce(
    (touchedObj, fieldName) => touchedObj && touchedObj[fieldName],
    touched
  );

  return (
    <label className={`block relative mt-3 mb-2 ${wrapperClassName}`}>
      <input
        {...props}
        ref={inputRef}
        type={inputType}
        className={`relative peer w-full bg-white flex items-center rounded-lg border border-1 border-[#b3b3b3] px-[16px] py-[14px] focus:border-[1.5px] focus:border-[#3C3C3C] focus:outline-none focus:ring-0 ${
          error && touch && "!border-red-400"
        } ${className} ${props.disabled && "bg-[#eaeaea]"}`}
        data-valid={!(error && touch) && undefined}
        id={name}
        name={name}
        value={value}
        onChange={(e) => {
          if (type == "number") {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          }
          onChange?.(e);
        }}
        onFocus={() => setIsInputFocused(true)}
        onBlur={(e) => {
          onBlur?.(e);
          setIsInputFocused(false);
        }}
      />

      {showLabel ? (
        <span
          onClick={() => inputRef.current?.focus()}
          className={`bg-white text-[#616161] text-sm px-1 absolute z-10 top-[calc(50%-10px)] left-4 peer-focus:!text-[#282828] transition-all duration-100 ease-in-out cursor-text ${
            (isInputFocused || value?.toString().length! > 0) &&
            "!text-[12px] !left-2 !top-[-10px] !cursor-default"
          } ${error && touch && "!text-red-400"} ${labelClassName}`}
        >
          {label}
        </span>
      ) : null}

      {type === "password" && (
        <div
          onClick={() => {
            setInputType(showPassword ? "text" : "password");
            setShowPassword((prev) => !prev);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-[#3C3C3C] cursor-pointer"
        >
          {showEyeIcon &&
            (showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />)}
        </div>
      )}

      {error && touch && (
        <p
          className={`mx-1 -mb-1 my-1 text-red-400 text-[10px] absolute ${errorClassName}`}
        >
          {error}
        </p>
      )}
    </label>
  );
}
