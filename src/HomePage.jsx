import { Link } from "react-router-dom";
import { SquareButton } from "./components/index";

import { FaPen, FaList, FaRoute, FaClock } from "react-icons/fa";

export default function HomePage() {
  return (
    <>
      <h3>Página Inicial(mudar esse texto)</h3>
      <div className="grid-container">
        <Link to="/form" style={{ textDecoration: "none" }}>
          <SquareButton label="Lista de chamada" Icon={FaPen} />
        </Link>
        <SquareButton label="Visualizar lista" Icon={FaList} disabled={true} />
        <SquareButton label="Em breve" Icon={FaRoute} disabled={true} />
        <SquareButton label="Em breve" Icon={FaClock} disabled={true} />
      </div>
    </>
  );
}
