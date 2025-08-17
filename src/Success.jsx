import { useNavigate } from "react-router-dom";
import { CodeButton, LargeButton, PhotoButton } from "./components/index";
import { FaCamera, FaCopy, FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Success() {
  const navigate = useNavigate();
  const [dados, setDados] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      setDados(JSON.parse(storedData));
    }
  }, []);

  return (
    <>
      <h3>Registro salvo com sucesso!</h3>

      {dados && (
        <div className="dataForm">
          <p>
            <strong>Nome:</strong> {dados.nome}
          </p>
          <p>
            <strong>Telefone:</strong> {dados.telefone}
          </p>
          <p>
            <strong>Tipo:</strong> {dados.tipoParticipante}
          </p>
          <p>
            <strong>Curso:</strong> {dados.curso}
          </p>
          <p>
            <strong>Equipe:</strong> {dados.equipe}
          </p>
          <p>
            <strong>Veículo:</strong> {dados.veiculo}
          </p>
          <p>
            <strong>Placa:</strong> {dados.placa}
          </p>
        </div>
      )}

      <br />

      <LargeButton label="Foto do veículo">
        <PhotoButton text="Visualizar foto" icon={<FaCamera />} />
      </LargeButton>

      <br />

      <LargeButton
        label="Navegação"
        icon={<FaHome />}
        text="Voltar à tela inicial"
        onClick={() => navigate("/")}
      />
    </>
  );
}
