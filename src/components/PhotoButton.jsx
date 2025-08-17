import Button from "./Button";
import { useState, useRef, useEffect } from "react";
import { FaEye } from "react-icons/fa";

const PhotoButton = ({
  text,
  icon,
  onPhotoChange,
  isRequired = false,
  triggerValidation = false,
}) => {
  const [photoTaken, setPhotoTaken] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedPhotoBase64 = localStorage.getItem("capturedPhoto");
    if (savedPhotoBase64) {
      setPhotoUrl(savedPhotoBase64);
      setPhotoTaken(true);
    }
  }, []);

  // Sempre que o form pedir validação, checa se está vazio
  useEffect(() => {
    if (isRequired && triggerValidation && !photoTaken) {
      setError("Foto é obrigatória");
    }
  }, [triggerValidation, isRequired, photoTaken]);

  const handleClick = () => {
    if (photoTaken) {
      setShowPhotoModal(true);
    } else {
      if (fileInputRef.current) fileInputRef.current.click();
    }
  };

  const handlePhotoCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        setPhotoUrl(base64Data);
        setPhotoTaken(true);
        setError(""); // remove erro se foto for tirada
        localStorage.setItem("capturedPhoto", base64Data);
        if (onPhotoChange) onPhotoChange(file, base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoTaken(false);
    setPhotoUrl(null);
    setPhotoFile(null);
    localStorage.removeItem("capturedPhoto");
    setShowPhotoModal(false);
    if (onPhotoChange) onPhotoChange(null, null);
    if (isRequired) setError("Foto é obrigatória");
  };

  return (
    <div className="photo-button-container">
      <button
        className={`large-button ${error ? "input-error" : ""}`}
        type="button"
        onClick={handleClick}
      >
        {icon && !photoTaken && (
          <span className="large-button-icon">{icon}</span>
        )}
        {photoTaken && (
          <span className="large-button-icon">
            <FaEye />
          </span>
        )}
        <span className="large-button-text">
          {photoTaken ? "Visualizar foto" : text}
        </span>
      </button>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handlePhotoCapture}
      />

      {error && <span className="error-text">{error}</span>}

      {showPhotoModal && (
        <div className="photo-modal-overlay">
          <div className="photo-modal">
            <img src={photoUrl} alt="Foto capturada" />
            <div className="button-container">
              <Button isCancell onClick={removePhoto}>
                Remover
              </Button>
              <Button onClick={() => setShowPhotoModal(false)}>Concluir</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoButton;
