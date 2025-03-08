import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./../Header/Header";
import Routers from "../../router/Routers";
import Footer from "./../Footer/Footer";

const Layout = () => {
  const location = useLocation(); // Debugging

  const hideFooter = location.pathname === "/profile"; // Check path

  return (
    <>
      <Header />
      <Routers />
      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;
