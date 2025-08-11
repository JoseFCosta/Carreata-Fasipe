const LargeButton = ({
  label,
  description,
  children,
  icon,
  text,
  onClick,
  isWarning = false,
}) => {
  return (
    <div className="large-button-container">
      {label && <label className="label">{label}</label>}
      {children ? (
        children
      ) : (
        <button className="large-button" type="button" onClick={onClick}>
          {icon && <span className="large-button-icon">{icon}</span>}
          <span className="large-button-text">{text}</span>
        </button>
      )}
      {isWarning ? (
        <>
          {description && (
            <p className="large-button-description-warning">{description}</p>
          )}
        </>
      ) : (
        <>
          {description && (
            <p className="large-button-description">{description}</p>
          )}
        </>
      )}
    </div>
  );
};

export default LargeButton;
