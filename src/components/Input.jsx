const Input = ({
  placeholder,
  onChange,
  label,
  showCheckbox = false,
  checkboxLabel = "",
  onCheckboxChange,
}) => {
  return (
    <div className="input-container">
      {label && <label className="label">{label}</label>}

      <input
        className="input"
        type="text"
        placeholder={placeholder}
        onChange={onChange}
      />

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
