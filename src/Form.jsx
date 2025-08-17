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

export default function Form() {
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
  const [validatePhoto, setValidatePhoto] = useState(false);

  const vehicleTypes = [
    { value: 1, label: "Bicicleta" },
    { value: 2, label: "Carro" },
    { value: 3, label: "Moto" },
    { value: 4, label: "Camionete" },
    { value: 5, label: "Van/Microônibus" },
    { value: 6, label: "Outros" },
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
      .replace(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/g, "")
      .slice(0, 8)
      .trim();
  };

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
    setValidatePhoto(true);

    const camposVazios = [];

    if (!nome) camposVazios.push("Nome");
    if (!telefone || telefone.length < 15)
      camposVazios.push("Telefone(vazio ou incompleto)");
    if (!tipoParticipante) camposVazios.push("Tipo de Participante");
    if (!curso) camposVazios.push("Curso");
    if (!equipe) camposVazios.push("Equipe");
    if (!veiculo) camposVazios.push("Veículo");
    if (!fotoFile) camposVazios.push("Foto");

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
      tipoParticipante,
      curso,
      equipe,
      veiculo,
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
        value={cursos}
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
