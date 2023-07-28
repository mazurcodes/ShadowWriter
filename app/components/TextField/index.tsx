'use client';
import { useState } from 'react';

type TextFieldProps = {
  label?: string;
  readonly?: boolean;
};

function TextField({ label, readonly = false }: TextFieldProps) {
  const [projectDescription, setProjectDescription] = useState('');

  return (
    <label htmlFor="description">
      {label && <p className="text-zinc-300 pb-3">{label}</p>}
      <textarea
        autoFocus
        name="description"
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
