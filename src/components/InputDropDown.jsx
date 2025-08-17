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

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = options.find(
      (opt) => String(opt.value) === selectedValue
    );

    if (onChange) {
      onChange({
        value: selectedOption?.value || "",
        label: selectedOption?.label || "",
      });
    }

    if (isRequired && selectedValue) setError(""); // limpa erro se algo válido for selecionado
  };

  return (
    <div className="input-container">
      {label && <label className="label">{label}</label>}
      <select
        className={`input ${error ? "input-error" : ""}`}
        onChange={handleChange}
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
