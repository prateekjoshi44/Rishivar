// import { Outlet, useLocation } from "react-router-dom";
// import Bottombar from "./Bottombar";
// import Topbar from "./Topbar";
// import ForegroundFcm from "../firebase/ForegroundFcm";
// import ForegroundCordovaFcm from "../firebase/ForegroundCordovaFcm";
// import { useEffect } from "react";

// const Layout = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     const classList = document.body.classList;
//     if (classList.contains("modal-open")) classList.remove("modal-open");

//     const backdrops = document.getElementsByClassName("modal-backdrop");
//     for (const backdrop of backdrops) backdrop.remove();
//   }, [pathname]);




//   return (
//     <div className="h-100 d-flex flex-column flex-lg "
//       style={{ backgroundColor: "#f4f4f4" }}>

//       {window.cordova ? <ForegroundCordovaFcm /> : <ForegroundFcm />}

//       <Topbar />
//       <CustomTobbar />
//       <main className="flex-grow-1 overflow-y-auto">
//         <Outlet />
//       </main>

//       <Bottombar />

//     </div>
//   )

// };

// export default Layout;


import { Outlet, useLocation } from "react-router-dom";
import Bottombar from "./Bottombar";
import Topbar from "./Topbar";
import CustomTopbar from "./CustomTopbar";
import ForegroundFcm from "../firebase/ForegroundFcm";
import ForegroundCordovaFcm from "../firebase/ForegroundCordovaFcm";
import { useEffect } from "react";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const classList = document.body.classList;
    if (classList.contains("modal-open")) classList.remove("modal-open");

    const backdrops = document.getElementsByClassName("modal-backdrop");
    for (const backdrop of backdrops) backdrop.remove();
  }, [pathname]);

  const customTopbarPaths = ["/Wallet", "/Coupons", "/Profile/EditProfile"];
  const shouldShowCustomTopbar = customTopbarPaths.some((path) => pathname.includes(path));

  return (
    <div className="h-100 d-flex flex-column flex-lg" style={{ backgroundColor: "#f4f4f4" }}>
      {window.cordova ? <ForegroundCordovaFcm /> : <ForegroundFcm />}

      {shouldShowCustomTopbar ? <CustomTopbar /> : <Topbar />}

      <main className="flex-grow-1 overflow-y-auto">
        <Outlet />
      </main>

      <Bottombar />
    </div>
  );
};

export default Layout;
