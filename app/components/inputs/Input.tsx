"use client";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disable?: boolean;
  autocomplete?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disable,
  autocomplete,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm leading-6 text-gray-900 font-medium"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disable}
          {...register(id, { required })}
          className={clsx(
            `text-sm
            form-input
            block 
            w-full
            border-0
            rounded-md
            py-1.5
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400 
            focus:ring-2
            focus:ring-inset
            focus:ring-sky-600
            sm:text-sm
            sm:leading6`,

            errors[id] && "focus:ring-rose-500",
            disable && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
