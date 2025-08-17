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
import { MdAlternateEmail } from "react-icons/md";

export default function Form() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [curso, setCurso] = useState("");
  const [equipe, setEquipe] = useState("");
  const [placa, setPlaca] = useState("");

  const [photoFile, setPhotoFile] = useState(null);
  const [photoBase64, setPhotoBase64] = useState(null);

  const [cursos, setCursos] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [veiculo, setVeiculo] = useState([]);

  const [tipoParticipante, setTipoParticipante] = useState([]);
  const [cursoLabel, setCursoLabel] = useState([]);
  const [equipeLabel, setEquipeLabel] = useState([]);
  const [veiculoLabel, setVeiculoLabel] = useState([]);
  const [tipoParticipanteLabel, setTipoParticipanteLabel] = useState([]);

  const [cursoLoading, setCursoLoading] = useState("");
  const [equipeLoading, setEquipeLoading] = useState("");

  const vehicleTypes = [
    { value: 1, label: "Bicicleta" },
    { value: 2, label: "Carro" },
    { value: 3, label: "Moto" },
    { value: 4, label: "Camionete" },
    { value: 5, label: "Van/Microônibus" },
    { value: 6, label: "Outros" },
  ];

  const tipo_Participante = [
    { value: 1, label: "Aluno" },
    { value: 2, label: "Convidado" },
  ];

  const nameMask = (value) => {
    return value

      .replace(/^\s+/, "")
      .replace(/[^A-Za-zÀ-ÿ\s]/g, "")
      .slice(0, 150);
  };
  const phoneMask = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{1})?(\d{4})(\d{4}).*/, "$1 $2-$3")
      .slice(0, 16);
  };

  const plateMask = (value) => {
    return value
      .toUpperCase()
      .replace(/^[A-Z][0-9][A-Z0-9][0-9]$/g, "")
      .slice(0, 8)
      .trim();
  };

  useEffect(() => {
    setCursoLoading("Carregando lista...");
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
        setCursoLoading("");
      })
      .catch((err) => console.error("Erro ao carregar cursos:", err));
  }, []);

  useEffect(() => {
    if (!curso) return;
    setEquipeLoading("Carregando lista...");

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
        setEquipeLoading("");
      })
      .catch((err) => console.error("Erro ao carregar equipes:", err));
  }, [curso]);

  const handlePhotoChange = (file, base64) => {
    setPhotoFile(file);
    setPhotoBase64(base64);
  };

  const handleConfirm = async () => {
    const camposVazios = [];

    if (!nome) camposVazios.push("Nome");
    if (!telefone || telefone.length < 15)
      camposVazios.push("Telefone(vazio ou incompleto)");
    if (!tipoParticipante) camposVazios.push("Tipo de Participante");
    if (!curso) camposVazios.push("Curso");
    if (!equipe) camposVazios.push("Equipe");
    if (!veiculo) camposVazios.push("Veículo");
    if (!photoFile && !photoBase64) camposVazios.push("Foto");

    if (
      veiculoLabel &&
      veiculoLabel !== "Bicicleta" &&
      veiculoLabel !== "Outros" &&
      !placa
    ) {
      camposVazios.push("Placa");
    }

    if (camposVazios.length > 0) {
      alert(
        "Os seguintes campos obrigatórios não foram preenchidos:\n- " +
          camposVazios.join("\n- ")
      );
      return;
    }

    const formData = {
      nome,
      telefone,
      tipoParticipante: tipoParticipanteLabel,
      curso: cursoLabel,
      equipe: equipeLabel,
      veiculo: veiculoLabel,
      placa,
    };
    localStorage.setItem("formData", JSON.stringify(formData));

    try {
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
      if (photoFile && participanteId) {
        const formData = new FormData();
        formData.append("arquivo", photoFile);
        formData.append("PARTICIPANTE_ID", participanteId);
        setEquipes;

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
        value={nome}
        mask={nameMask}
      />

      <Input
        label="Telefone"
        placeholder="Ex: (65) 9 0000-0000"
        onChange={(e) => setTelefone(e.target.value)}
        value={telefone}
        mask={phoneMask}
      />

      <InputDropDown
        label="Participante"
        options={tipo_Participante}
        placeholder="Participante(aluno) ou convidado"
        onChange={(option) => {
          setTipoParticipante(option.value);
          setTipoParticipanteLabel(option.label);
        }}
      />

      <InputDropDown
        label="Curso"
        options={cursos}
        placeholder="Selecione seu curso"
        onChange={(option) => {
          setCurso(option.value);
          setCursoLabel(option.label);
        }}
        loading={cursoLoading}
      />

      <InputDropDown
        label="Equipe"
        options={equipes}
        placeholder="Selecione sua equipe"
        onChange={(option) => {
          setEquipe(option.value);
          setEquipeLabel(option.label);
        }}
        loading={equipeLoading}
      />

      <InputDropDown
        label="Veiculo"
        options={vehicleTypes}
        placeholder="Selecione o seu tipo veiculo"
        onChange={(option) => {
          setVeiculo(option.value);
          setVeiculoLabel(option.label);
        }}
      />

      <Input
        label="Placa do veículo"
        placeholder="Ex: ABC1D23"
        description="(Necessário apenas se o seu veículo possuir placa)"
        onChange={(e) => setPlaca(e.target.value)}
        mask={plateMask}
        value={placa}
        isRequired={false}
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

      <div className="button-container">
        <Button isCancell={true} onClick={() => navigate("/")}>
          Cancelar
        </Button>
        <Button onClick={handleConfirm}>Confirmar</Button>
      </div>
    </>
  );
}
