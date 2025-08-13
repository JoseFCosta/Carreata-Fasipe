import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  InputDropDown,
  LargeButton,
  PhotoButton,
} from "./components";
import { FaCamera } from "react-icons/fa";
import { useState } from "react";

export default function Form() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [curso, setCurso] = useState("");
  const [equipe, setEquipe] = useState("");
  const [veiculo, setVeiculo] = useState("");
  const [placa, setPlaca] = useState("");
  const [fotoBase64, setFotoBase64] = useState(null);

  const equipList = [
    "Aguia Real",
    "Digito Zero",
    "Suprema Corte",
    "Os imunes",
    "Os Parasitas",
    "Freudguesa Gourmet",
    "Forset",
    "Mentes Brilhantes",
    "Guardiões da Justiça",
    "Odonto Elite",
    "Enferbrasa",
    "Asclepion",
    "Justiceiros",
    "Phoenix",
    "Tropa do Baguncinha",
    "Risotril",
    "Glow & Sabor",
  ];

  const courseList = [
    "Análise e Desenvolvimento de Sistemas",
    "Biomedicina",
    "Ciências Contábeis",
    "Direito",
    "Enfermagem",
    "Estética e Cosmética",
    "Fisioterapia",
    "Nutrição",
    "Odontologia",
    "Psicologia",
  ];

  const vehicleTypes = [
    "Bicicleta",
    "Carro",
    "Moto",
    "Camionete",
    "Van/Microônibus",
    "Outros",
  ];

  const handlePhotoChange = (file, base64) => {
    setFotoBase64(base64);
  };

  const handleConfirm = () => {
    const dados = { nome, telefone, curso, equipe, veiculo, placa, fotoBase64 };
    localStorage.setItem("formData", JSON.stringify(dados));
    navigate("/success");
  };

  return (
    <>
      <h2>Registro de veiculo</h2>

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
        label="Curso"
        options={courseList}
        placeholder="Selecione seu curso"
        onChange={(e) => setCurso(e.target.value)}
      />

      <InputDropDown
        label="Equipe"
        options={equipList}
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
