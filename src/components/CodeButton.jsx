import { useState } from "react";
import { FaCheck } from "react-icons/fa";

const CodeButton = ({ text, icon, code }) => {
  const [copyFeedback, setCopyFeedback] = useState(false);

  const copyToClipboard = (text) => {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.body.removeChild(tempInput);
    setCopyFeedback(true);

    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <button
      className="large-button"
      type="button"
      onClick={() => copyToClipboard(code)}
    >
      {icon && (
        <span className="large-button-icon">
          {copyFeedback ? <FaCheck /> : icon}
        </span>
      )}
      <span className="large-button-text">
        {copyFeedback ? "Código copiado!" : code || text}
      </span>
    </button>
  );
};

export default CodeButton;
