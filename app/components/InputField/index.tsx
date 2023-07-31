'use client';
import { useState } from 'react';

type TextFieldProps = {
  name: string;
  label?: string;
  readonly?: boolean;
};

function InputField({ label, name, readonly = false }: TextFieldProps) {
  const [value, setValue] = useState('');

  return (
    <label htmlFor={name}>
      {label && <p className="text-zinc-300 pb-3">{label}</p>}
      <input
        autoFocus
        name={name}
        onChange={(event) => setValue(event.target.value)}
        value={value}
        className="w-80 bg-zinc-800 p-3 text-zinc-300 resize-none "
        readOnly={readonly}
      />
    </label>
  );
}

export default InputField;
