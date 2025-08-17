import { Link } from "react-router-dom";
import { SquareButton } from "./components/index";

import { FaCar, FaPen, FaList, FaRoute, FaClock } from "react-icons/fa";

export default function HomePage() {
  return (
    <>
      <h3 style={{ marginBlockEnd: "0px" }}>Página Inicial</h3>
      <p style={{ color: "#B53333", marginBlockEnd: "0px" }}>
        A lista que será preenchida NÃO é a presença
      </p>
      <div className="grid-container">
        <Link to="/form2" style={{ textDecoration: "none" }}>
          <SquareButton label="Registro de veículos" Icon={FaCar} />
        </Link>
        <SquareButton label="Em breve" Icon={FaList} disabled={true} />
        <SquareButton label="Em breve" Icon={FaRoute} disabled={true} />
        <SquareButton label="Em breve" Icon={FaClock} disabled={true} />
      </div>
    </>
  );
}
