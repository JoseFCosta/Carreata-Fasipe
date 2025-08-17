import { Outlet } from "react-router-dom";
import FasipeLogo from "../assets/FasipeLogo.png";
import NetCursos from "../assets/NetCursos.png";
import NetCursosLogo from "../assets/NetCursosLogo2.png";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <div className="main-layout-header">
        <br />
        <img src={FasipeLogo} alt="Topo" className="main-layout-image" />
        {/* <div className="image-container">
          <img src={FasipeLogo} alt="Topo" className="main-layout-image" />
          <img src={NetCursosLogo} alt="Topo" className="main-layout-image" />
        </div> */}
        <br />
        <img src={NetCursos} alt="Topo" className="main-layout-image" />
      </div>

      <Outlet />
      <div className="main-layout-content">{children}</div>
    </div>
  );
};

export default MainLayout;
