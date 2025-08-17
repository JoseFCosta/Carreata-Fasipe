import "./Components.css";

const InputDropDown = ({ options, placeholder, label, onChange }) => {
  return (
    <div className="input-container">
      {label && <label className="label">{label}</label>}
      <select className="input" onChange={onChange} defaultValue="">
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputDropDown;
