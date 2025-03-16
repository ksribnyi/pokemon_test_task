import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  error,
  ...props
}) => {
  return (
    <div className="relative flex flex-col gap-2 w-full">
      <label className="text-sm font-medium text-gray-800">
        {label} <span className="text-red-500">*</span>
      </label>
      <div
        className={`relative flex items-center border rounded-lg p-2 transition-colors bg-white
                ${error ? 'border-red-500' : 'border-gray-300 hover:border-purple-600 focus-within:border-purple-600'}`}
      >
        <input
          type={type}
          className="flex-1 px-2 text-gray-800 outline-none bg-transparent w-92 h-4 py-3 px-2 text-sm"
          {...props}
        />
      </div>
      {error && (
        <span className="absolute top-18 left-0 text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
