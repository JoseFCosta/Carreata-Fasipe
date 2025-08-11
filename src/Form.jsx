// import { useNavigate } from "react-router-dom";
// import {
//   Button,
//   Input,
//   InputDropDown,
//   LargeButton,
//   PhotoButton,
// } from "./components";
// import { FaCamera } from "react-icons/fa";

// export default function Form() {
//   const navigate = useNavigate();

//   const handleNavigate = (path) => {
//     navigate(path);
//   };

//   const handlePhotoChange = (file, base64) => {
//     console.log("Foto capturada:", file, base64);
//   };

//   return (
//     <>
//       <h2>Lista de chamda</h2>

//       <Input label="Nome Completo" placeholder="Ex: João Da Silva Neto" />
//       <Input label="Registro de aluno (RA)" placeholder="Ex: 103929" />

//       <InputDropDown
//         label="Curso"
//         options={["Ads", "Direito", "Odonto", "Biomedicina"]}
//         placeholder="Selecione seu curso"
//       />

//       <InputDropDown
//         label="Equipe"
//         options={[
//           "Equipe Ads",
//           "Equipe Direito",
//           "Equipe Odonto",
//           "Equipe Biomedicina",
//         ]}
//         placeholder="Selecione sua equipe"
//       />

//       <InputDropDown
//         label="Veiculo"
//         options={["Carro", "Moto", "Outro"]}
//         placeholder="Selecione o seu tipo veiculo"
//       />

//       <LargeButton
//         label="Foto do veículo"
//         description="A foto deve mostrar o máximo possível do veículo e a placa"
//       >
//         <PhotoButton
//           text="Retirar foto"
//           icon={<FaCamera />}
//           onPhotoChange={handlePhotoChange}
//         />
//       </LargeButton>
//       <br />
//       <br />
//       <div className="button-container">
//         <Button
//           children={"Cancelar"}
//           isCancell={true}
//           onClick={() => handleNavigate("/")}
//         />
//         <Button
//           children={"Confirmar"}
//           onClick={() => handleNavigate("/success")}
//         />
//       </div>
//     </>
//   );
// }
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
  const [ra, setRa] = useState("");
  const [curso, setCurso] = useState("");
  const [equipe, setEquipe] = useState("");
  const [veiculo, setVeiculo] = useState("");
  const [fotoBase64, setFotoBase64] = useState(null);

  const handlePhotoChange = (file, base64) => {
    setFotoBase64(base64);
  };

  const handleConfirm = () => {
    const dados = { nome, ra, curso, equipe, veiculo, fotoBase64 };
    localStorage.setItem("formData", JSON.stringify(dados));
    navigate("/success");
  };

  return (
    <>
      <h2>Lista de chamada</h2>

      <Input
        label="Nome Completo"
        placeholder="Ex: João Da Silva Neto"
        onChange={(e) => setNome(e.target.value)}
      />
      <Input
        label="Registro de aluno (RA)"
        placeholder="Ex: 103929"
        onChange={(e) => setRa(e.target.value)}
      />

      <InputDropDown
        label="Curso"
        options={["Ads", "Direito", "Odonto", "Biomedicina"]}
        placeholder="Selecione seu curso"
        onChange={(e) => setCurso(e.target.value)}
      />

      <InputDropDown
        label="Equipe"
        options={[
          "Equipe Ads",
          "Equipe Direito",
          "Equipe Odonto",
          "Equipe Biomedicina",
        ]}
        placeholder="Selecione sua equipe"
        onChange={(e) => setEquipe(e.target.value)}
      />

      <InputDropDown
        label="Veiculo"
        options={["Carro", "Moto", "Outro"]}
        placeholder="Selecione o seu tipo veiculo"
        onChange={(e) => setVeiculo(e.target.value)}
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
