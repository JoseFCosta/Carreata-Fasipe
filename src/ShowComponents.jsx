import { useState } from "react";

import {
  Button,
  Input,
  InputDropDown,
  SquareButton,
  LargeButton,
  PhotoButton,
  CodeButton,
} from "./components/index";

import {
  FaHome,
  FaCog,
  FaQuestionCircle,
  FaUser,
  FaCamera,
  FaCopy,
} from "react-icons/fa";

export default function ShowComponentes() {
  const [dropdownValue, setDropdownValue] = useState("");

  const handlePhotoChange = (file, base64) => {
    console.log("Foto capturada:", file, base64);
  };

  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value);
  };

  return (
    <>
      <h3>Botões</h3>
      <div className="button-container">
        <Button children={"Cancelar"} isCancell={true} />
        <Button children={"Confirmar"} />
      </div>
      <br />

      <Input
        label="Input Default"
        placeholder="Insira algum texto"
        onChange={(e) => console.log("Input:", e.target.value)}
      />

      <InputDropDown
        label="InputDropDown"
        options={["Option 1", "Option 2", "Option 3"]}
        placeholder="Select an option"
        onChange={handleDropdownChange}
      />

      <h3>Botões Largo</h3>

      <div style={{ padding: "20px" }}>
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

        <LargeButton
          label="Código de acesso"
          description="Clique para copiar seu código"
        >
          <CodeButton text="Copiar código" icon={<FaCopy />} code="ABC123XYZ" />
        </LargeButton>

        <LargeButton
          label="Navegação"
          icon={<FaHome />}
          text="Voltar à tela inicial"
          onClick={() => console.log("Voltando...")}
        />
      </div>

      <h3>Botões quadrados</h3>
      <div className="grid-container">
        <SquareButton label="Início" Icon={FaHome} />
        <SquareButton label="Configurações" Icon={FaCog} />
        <SquareButton label="Ajuda" Icon={FaQuestionCircle} />
        <SquareButton label="Perfil" Icon={FaUser} />
      </div>
    </>
  );
}
