import React, { useState } from "react";

const Input = ({
  placeholder,
  onChange,
  label,
  showCheckbox = false,
  checkboxLabel = "",
  onCheckboxChange,
  description = null,
  isRequired = true,
  value,
  mask,
}) => {
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    let val = e.target.value;
    if (mask) {
      val = mask(val);
    }
    onChange({ target: { value: val } });
  };

  const showError = isRequired && touched && !value.trim();

  return (
    <div className="input-container">
      {label && <label className="label">{label}</label>}
      <p className="large-button-description">{description}</p>

      <input
        className={`input ${showError ? "input-error" : ""}`}
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        value={value}
      />

      {showError && <span className="error-text">Campo obrigatório</span>}

      {showCheckbox && (
        <label className="input-checkbox-container">
          <input
            type="checkbox"
            className="input-checkbox"
            onChange={onCheckboxChange}
          />
          <span className="checkbox-label">{checkboxLabel}</span>
        </label>
      )}
    </div>
  );
};
export default Input;
