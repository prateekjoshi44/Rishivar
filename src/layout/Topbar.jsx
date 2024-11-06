import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { BsFilePost, BsPersonBoundingBox } from "react-icons/bs";
import { IoWallet } from "react-icons/io5";
import IncomingChat from "../firebase/IncomingChat";
import IncomingCall from "../firebase/IncomingCall";
import IsChatActive from "../firebase/IsChatActive";
import IsCallActive from "../firebase/IsCallActive";
import Icons from "../components/ui/Icons";
import { useGetProfileQuery } from "../services/profileSlice";
import ApiErrorModal from "../components/modal/ApiErrorModal";

const className = "d-block mx-auto mb-1";
const style = { height: 24, width: 24 };

export const topbarLinks = [
  {
    text: "Home",
    to: "/",
    icon: () => <MdDashboard className={className} style={style} />,
  },
  {
    text: "Astro",
    to: "/Astro",
    icon: () => <BsPersonBoundingBox className={className} style={style} />,
  },
  {
    text: "Posts",
    to: "/Post",
    icon: () => <BsFilePost className={className} style={style} />,
  },
  {
    text: "Wallet",
    to: "/Wallet",
    icon: () => <IoWallet className={className} style={style} />,
  },
];

const Topbar = () => {
  const { pathname } = useLocation();
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const profileRes = useGetProfileQuery();

  const revOptions = [...topbarLinks].reverse();

  let options = pathname.split("/");
  if (options.length === 2 && options[1] === "") options = [options[0]];
  options = options.map((o) => (o === "" ? "Dashboard" : o));

  const renderLink = ({ text, to, icon }) => (
    <li className="nav-item" key={text}>
      <NavLink to={to} className="top-nav-link">
        {icon()}
        {text}
      </NavLink>
    </li>
  );

  useEffect(() => {
    setTitle(
      revOptions.find((o) => pathname.includes(o.to))?.text || "Dashboard"
    );
  }, [pathname]);

  const backButton = [
    `/Astro/${id}`,

  ]

  const hideTopbar =
    (location.pathname.includes("/Chat/") &&
      location.pathname.includes("/active")) ||
    (location.pathname.includes("/Call/") &&
      location.pathname.includes("/active"));

  if (hideTopbar) {
    return null;
  }
  if (profileRes.isError) return <ApiErrorModal res={profileRes} />;


  return (
    <div className=" mb-0 mb-lg-3 w-100 position-absolut z-100  ">
      <header className="  ">
        <div className=" py- text-bg-dark  bg-primary rounded-bottom-4 shadow">
          <div className="container px-2">
            <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-start px-2">


              {pathname.includes(backButton) ?

                <Link to="/Astro" className="my-lg-0 me-lg-auto  text-decoration-none px-1  py-1 d-flex align-items-center  " style={{ marginTop: 12, marginBottom: 12 }} >

                  {Icons.back("fs-4 text-white")}

                </Link>

                :

                <Link
                  to="/"
                  className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none fw-bold"
                >
                  <div className="fw-bold  fs-2 mont">Rishivar</div>
                </Link>}

              <div className="d-flex d-lg-none placeholder-glow  gap-2">

                {
                  profileRes.isLoading ?
                    <Link to="/Wallet" className="bg-white rounded-pill text-decoration-none px-2 py-1 d-flex align-items-center placeholder ">

                      {Icons.wallet("fs-4")}

                      <div className="text-primary fw-semibold fs-14 ms-2  ">₹ 0</div>
                    </Link>
                    :
                    <Link to="/Wallet" className="bg-white rounded-pill  py-1 d-flex align-items-center text-decoration-none px-2 ">

                      {Icons.wallet("fs-4")}

                      <div className="text-primary fw-semibold fs-6 ms-2  ">₹ {profileRes.data.balance}</div>
                    </Link>
                }

                <div className="bg-white rounded-circle  d-flex align-items-center  " style={{ paddingLeft: 5, paddingRight: 5 }}>
                  <Link
                    className="text-white ms-auto text-decoration-none"
                    to="/Notifications"
                  >
                    {Icons.notification("fs-4", { color: "#fe6a0e" })}
                  </Link>
                </div>
              </div>
              <div className="d-lg-block d-none">
                <ul className="nav nav-pills">{topbarLinks.map(renderLink)}</ul>
              </div>
            </div>
          </div>
        </div>
        <div className="px-3 py-2 border-bottom  d-lg-block d-none">
          <div className="container-fluid px-4 d-flex flex-column flex-wrap justify-content-center">
            <h3 className="mb-0">{title}</h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                {options.map((option, index) => {
                  if (index === options.length - 1) {
                    return (
                      <li
                        key={index}
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        {option}
                      </li>
                    );
                  } else {
                    return (
                      <li key={index} className="breadcrumb-item">
                        <Link
                          to={topbarLinks.find((o) => o.text === option)?.to}
                        >
                          {option}
                        </Link>
                      </li>
                    );
                  }
                })}
              </ol>
            </nav>
          </div>

        </div>


      </header>

      <IncomingChat />
      <IncomingCall />
      <IsChatActive />
      <IsCallActive />

    </div>
  );
};

export default Topbar;
