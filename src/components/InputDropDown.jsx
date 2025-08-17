import React, { useState } from "react";

const InputDropDown = ({
  options,
  placeholder,
  label,
  onChange,
  isRequired = true,
  errorMessage = "Campo obrigatório",
}) => {
  const [error, setError] = useState("");

  const handleBlur = (e) => {
    const v = e.target.value;
    if (isRequired && !v) {
      setError(errorMessage);
    } else {
      setError("");
    }
  };

  return (
    <div className="input-container">
      {label && <label className="label">{label}</label>}
      <select
        className={`input ${error ? "input-error" : ""}`}
        onChange={onChange}
        onBlur={handleBlur}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default InputDropDown;
