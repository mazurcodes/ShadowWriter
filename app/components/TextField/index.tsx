'use client';
import { useState } from 'react';

type TextFieldProps = {
  name: string;
  label?: string;
  readonly?: boolean;
};

function TextField({ label, name, readonly = false }: TextFieldProps) {
  const [projectDescription, setProjectDescription] = useState('');

  return (
    <label htmlFor={name}>
      {label && <p className="text-zinc-300 pb-3">{label}</p>}
      <textarea
        autoFocus
        name={name}
        placeholder='like "This project is about the crypto exchange for the tybetan people"'
        onChange={(event) => setProjectDescription(event.target.value)}
        value={projectDescription}
        className="w-80 bg-zinc-800 p-3 text-zinc-300 resize-none "
        rows={10}
        readOnly={readonly}
      />
    </label>
  );
}

export default TextField;
