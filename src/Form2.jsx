import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  InputDropDown,
  LargeButton,
  PhotoButton,
} from "./components";
import { FaCamera } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Form2() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipoParticipante, setTipoParticipante] = useState("");
  const [curso, setCurso] = useState("");
  const [equipe, setEquipe] = useState("");
  const [veiculo, setVeiculo] = useState("");
  const [placa, setPlaca] = useState("");
  const [fotoFile, setFotoFile] = useState(null);

  const [cursos, setCursos] = useState([]);
  const [equipes, setEquipes] = useState([]);

  const vehicleTypes = [
    { value: 1, label: "Bicicleta" },
    { value: 2, label: "Carro" },
    { value: 3, label: "Moto" },
    { value: 4, label: "Camionete" },
    { value: 5, label: "Van/Microônibus" },
    { value: 6, label: "Outros" },
  ];

  // Carregar lista de cursos
  useEffect(() => {
    axios
      .get(
        "https://netcursos.inf.br/carreata/backend/public/index.php/api/cursos"
      )
      .then((res) => {
        const lista = res.data.map((c) => ({
          value: c.CURSO_ID,
          label: c.NOME_CURSO,
        }));
        setCursos(lista);
      })
      .catch((err) => console.error("Erro ao carregar cursos:", err));
  }, []);

  // Carregar lista de equipes quando curso mudar
  useEffect(() => {
    if (!curso) return;

    axios
      .get(
        `https://netcursos.inf.br/carreata/backend/public/index.php/api/equipe?curso_id=${curso}`
      )
      .then((res) => {
        const lista = res.data.map((e) => ({
          value: e.ID_EQUIPE,
          label: e.NOME_EQUIPE,
        }));
        setEquipes(lista);
      })
      .catch((err) => console.error("Erro ao carregar equipes:", err));
  }, [curso]);

  const handlePhotoChange = (file, base64) => {
    setFotoFile(file);
  };

  const handleConfirm = async () => {
    try {
      // 1 - Envia participante
      const participanteRes = await axios.post(
        "https://netcursos.inf.br/carreata/backend/public/index.php/api/participantes",
        {
          NOME_PARTICIPANTE: nome,
          TELEFONE_PARTICIPANTE: telefone,
          TIPO_PARTICIPANTE: tipoParticipante,
          CURSO_ID: curso,
          EQUIPE_ID: equipe,
          TIPO_VEICULO: veiculo,
          PLACA_VEICULO: placa,
          STATUS: 1,
        }
      );

      const participanteId = participanteRes.data?.id;

      // 2 - Envia foto
      if (fotoFile && participanteId) {
        const formData = new FormData();
        formData.append("arquivo", fotoFile);
        formData.append("PARTICIPANTE_ID", participanteId);

        await axios.post(
          "https://netcursos.inf.br/carreata/backend/public/index.php/api/midias",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      navigate("/success");
    } catch (err) {
      console.error("Erro ao enviar formulário:", err);
      alert("Erro ao enviar formulário. Tente novamente.");
    }
  };

  return (
    <>
      <h2>Registro de veículo</h2>

      <Input
        label="Nome Completo"
        placeholder="Ex: João Da Silva Neto"
        onChange={(e) => setNome(e.target.value)}
      />

      <Input
        label="Telefone"
        placeholder="Ex: 65 9 0000-0000"
        onChange={(e) => setTelefone(e.target.value)}
      />

      <InputDropDown
        label="Participante"
        options={[
          { value: 1, label: "Participante" },
          { value: 2, label: "Convidado" },
        ]}
        placeholder="Participante(aluno) ou convidado"
        onChange={(e) => setTipoParticipante(e.target.value)}
      />

      <InputDropDown
        label="Curso"
        options={cursos}
        placeholder="Selecione seu curso"
        onChange={(e) => setCurso(e.target.value)}
      />

      <InputDropDown
        label="Equipe"
        options={equipes}
        placeholder="Selecione sua equipe"
        onChange={(e) => setEquipe(e.target.value)}
      />

      <InputDropDown
        label="Veiculo"
        options={vehicleTypes}
        placeholder="Selecione o seu tipo veiculo"
        onChange={(e) => setVeiculo(e.target.value)}
      />

      <Input
        label="Placa do veiculo"
        placeholder="Ex: ABC1D23"
        description="(Necessário apenas se o seu veiculo possuir)"
        onChange={(e) => setPlaca(e.target.value)}
      />

      <LargeButton
        label="Foto do veículo"
        description="A foto deve mostrar o máximo possível do veículo e a placa"
      >
        <PhotoButton
          text="Retirar foto"
          icon={<FaCamera />}
          onPhotoChange={handlePhotoChange}
        />
      </LargeButton>

      <br />
      <br />
      <div className="button-container">
        <Button isCancell={true} onClick={() => navigate("/")}>
          Cancelar
        </Button>
        <Button onClick={handleConfirm}>Confirmar</Button>
      </div>
    </>
  );
}
