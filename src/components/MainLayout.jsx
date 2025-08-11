import { Outlet } from "react-router-dom";

const MainLayout = ({ title, children }) => {
  return (
    <div className="main-layout">
      <div className="main-layout-header">
        <img
          src="/src/assets/FasipeLogo.png"
          alt="Topo"
          className="main-layout-image"
        />
      </div>

      <Outlet />
      <div className="main-layout-content">{children}</div>
    </div>
  );
};

export default MainLayout;
