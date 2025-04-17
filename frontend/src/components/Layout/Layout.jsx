import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Header from "./../Header/Header";
import Routers from "../../router/Routers";
import Footer from "./../Footer/Footer";
import { AuthContext } from "../../context/AuthContext";

// import CommonSection from "..";


const Layout = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";

  // Hide footer for admin & on specific pages
  const hideFooter = isAdmin || ["/displayProfile", "/editProfile"].includes(location.pathname);

  return (
    <>
      <Header />
      {/* {location.pathname === "/" && <CommonSection />} */}
      <Routers />
      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;

// import React from "react";
// import { useLocation } from "react-router-dom";
// import Header from "./../Header/Header";
// import Routers from "../../router/Routers";
// import Footer from "./../Footer/Footer";

// const Layout = () => {
//   const location = useLocation();
//   // const hideFooter = location.pathname === "/displayProfile" && "/editProfile"; // Check path
//   const hideFooter = ["/displayProfile", "/editProfile"].includes(location.pathname);


//   return (
//     <>
//       <Header />
//       <Routers />
//       {!hideFooter && <Footer />}
//       {/* <Footer/> */}
//     </>
//   );
// };

// export default Layout;
