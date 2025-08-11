import { FaHome } from "react-icons/fa";

const SquareButton = ({
  Icon = FaHome,
  label = "Sem texto",
  disabled = false,
}) => {
  return (
    <div className={`square-content ${disabled ? "disabled" : ""}`}>
      <div className={`square ${disabled ? "disabled" : ""}`}>
        {Icon && <Icon size={50} color="#FEFEFE" />}
      </div>
      <span className="square-label">{label}</span>
    </div>
  );
};

export default SquareButton;
