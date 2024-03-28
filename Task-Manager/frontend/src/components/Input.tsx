import{ FC, InputHTMLAttributes } from 'react';

interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputWithLabel: FC<InputWithLabelProps> = ({ label, ...rest }) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1">{label}</label>
      <input
        className="border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        {...rest}
      />
    </div>
  );
};

export default InputWithLabel;
