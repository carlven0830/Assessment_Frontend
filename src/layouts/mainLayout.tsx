import { Outlet } from "react-router-dom";
import SideNav from "../components/sideNav/sideNav";

function MainLayout() {
  return (
    <>
      <SideNav></SideNav>
      <div className="mainContent">
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default MainLayout;
