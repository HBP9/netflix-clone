import { Outlet } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";

const Layout = () => {
  return (
    <div>
      <HomeNavbar />
      <Outlet />
    </div>
  );
};

export default Layout;
