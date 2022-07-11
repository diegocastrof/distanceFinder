import { Controller, useFormContext } from "react-hook-form";

import "./AddressInputStyles.css";

interface Props {
  id: string;
  label: string;
  defaultValue?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const AddressInput = ({
  id,
  label,
  defaultValue = "",
  type = "text",
  placeholder = "",
  inputProps,
}: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={id}
      defaultValue={defaultValue}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {label}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            {...inputProps}
          />
          <p className="text-red-500 text-xs my-1 italic">
            {error && error?.message}
          </p>
        </div>
      )}
    />
  );
};

export default AddressInput;
