import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./../Header/Header";
import Routers from "../../router/Routers";
import Footer from "./../Footer/Footer";

const Layout = () => {
  const location = useLocation();
  // const hideFooter = location.pathname === "/displayProfile" && "/editProfile"; // Check path
  const hideFooter = ["/displayProfile", "/editProfile"].includes(location.pathname);


  return (
    <>
      <Header />
      <Routers />
      {!hideFooter && <Footer />}
      {/* <Footer/> */}
    </>
  );
};

export default Layout;
