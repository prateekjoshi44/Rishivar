import { Link, useLocation } from "react-router-dom";
import Icons from "../components/ui/Icons";

const CustomTopbar = () => {
  const { pathname } = useLocation();

  const getTitle = () => {

    if (pathname.includes("/Wallet")) return "My Wallet";
    else if (pathname.includes("/Coupons")) return "My Coupons";
    else if (pathname.includes("/Profile/EditProfile")) return "My Profile";
    return "Rishivar";
  };



  return (
    <header className="bg-primary text-bg-dark w-100 position-absolute shadow rounded-bottom-4">
      <div className="container-fluid d-flex justify-content-between align-items-center position-relative px-3">
        <Link to="/" className="bg-white rounded-2 shadow-sm my-lg-0 me-lg-auto px-1 py-1 d-flex align-items-center" style={{ marginTop: 12, marginBottom: 12 }}>
          {Icons.back("fs-4")}
        </Link>

        <h3 className="text-white fs-5 position-absolute top-50 start-50 translate-middle">
          {getTitle()}
        </h3>
      </div>
    </header>

  );
};

export default CustomTopbar;
