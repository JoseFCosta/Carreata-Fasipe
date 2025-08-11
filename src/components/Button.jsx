import "./components.css";

const Button = ({ children, onClick, type = "button", isCancell = false }) => {
  return (
    <button
      className={`button ${isCancell ? "button-cancell" : ""}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
