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
      <h2>Registro salvo com sucesso!</h2>

      <label className="label">Registros armazenados</label>
      {dados && (
        <div className="dataForm">
          {Object.entries(dados).map(([chave, valor]) => {
            if (!valor) return null;

            const rotulos = {
              nome: "Nome",
              telefone: "Telefone",
              tipoParticipante: "Tipo",
              curso: "Curso",
              equipe: "Equipe",
              veiculo: "Veículo",
              placa: "Placa",
            };

            return (
              <p key={chave}>
                <strong>{rotulos[chave] || chave}:</strong> {valor}
              </p>
            );
          })}
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
