// import { useNavigate } from "react-router-dom";
// import { CodeButton, LargeButton, PhotoButton } from "./components/index";
// import { FaCamera, FaCopy, FaHome } from "react-icons/fa";

// export default function Success() {
//   const navigate = useNavigate();

//   const handleNavigate = (path) => {
//     navigate(path);
//   };
//   return (
//     <>
//       <h3>Registro salvo com sucesso!</h3>
//       <LargeButton label="Código de acesso" description="Copie o código">
//         <CodeButton
//           text="Copiar código"
//           icon={<FaCopy />}
//           code="KJGD9124JIOA-213U12AS"
//         />
//       </LargeButton>
//       <LargeButton label="Foto do veículo">
//         <PhotoButton text="Retirar foto" icon={<FaCamera />} />
//       </LargeButton>
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <LargeButton
//         label="Navegação"
//         icon={<FaHome />}
//         text="Voltar à tela inicial"
//         onClick={() => handleNavigate("/")}
//       />
//     </>
//   );
// }
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
      <LargeButton
        label="Código de acesso"
        description="Esse código comprova o seu registro. Caso haja qualquer contextação ele será levado em conta para autenticar sua presença"
        isWarning={true}
      >
        <CodeButton
          text="Copiar código"
          icon={<FaCopy />}
          code="KJGD9124JIOA-213U12AS"
        />
      </LargeButton>

      {dados && (
        <div className="dataForm">
          <p>
            <strong>Nome:</strong> {dados.nome}
          </p>
          <p>
            <strong>RA:</strong> {dados.ra}
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
