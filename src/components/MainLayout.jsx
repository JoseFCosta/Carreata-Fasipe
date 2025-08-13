import { Outlet } from "react-router-dom";
import FasipeLogo from "../assets/FasipeLogo.png";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <div className="main-layout-header">
        <img src={FasipeLogo} alt="Topo" className="main-layout-image" />
      </div>

      <Outlet />
      <div className="main-layout-content">{children}</div>
    </div>
  );
};

export default MainLayout;
