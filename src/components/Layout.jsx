import { Outlet } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";
import HomeFooter from "./HomeFooter";

const Layout = () => {
  return (
    <div>
      <HomeNavbar />
      <Outlet />
      <HomeFooter />
    </div>
  );
};

export default Layout;
