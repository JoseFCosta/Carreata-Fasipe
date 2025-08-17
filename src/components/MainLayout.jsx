import { Outlet } from "react-router-dom";
import FasipeLogo from "../assets/FasipeLogo.png";
import NetCursosLogo from "../assets/NetCursos.png";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <div className="main-layout-header">
        <br />
        <img src={FasipeLogo} alt="Topo" className="main-layout-image" />
        <h2 style={{ marginBlockEnd: "0" }}>Em parceria</h2>
        <img src={NetCursosLogo} alt="Topo" className="partner-layout-image" />
      </div>
      <div className="outlet-container">
        <Outlet />
      </div>
      <div className="main-layout-content">{children}</div>
    </div>
  );
};

export default MainLayout;
