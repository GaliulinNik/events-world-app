import React from "react";
import "./styles.css";

export const InputText = ({
  type = "text",
  name,
  placeholder,
  onChange,
  value,
}: {
  type: string;
  name: string;
  placeholder?: string;
  onChange?: any;
  value?: string;
}) => {
  return (
    <input
      className="InputText"
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};
