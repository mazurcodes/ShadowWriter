import { useState } from "react";

type TextFieldProps = {
  label: string;
};

function TextField({ label }: TextFieldProps) {
  const [projectDescription, setProjectDescription] = useState("");

  return (
    <textarea
      autoFocus
      name="description"
      placeholder='like "This project is about the crypto exchange for the tybetan people"'
      onChange={(event) => setProjectDescription(event.target.value)}
      value={projectDescription}
      className=""
      rows={10}
    />
  );
}

export default TextField;
