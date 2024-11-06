import { NavLink, useLocation, useParams } from "react-router-dom";
import swastikImg from "../assets/images/swastika.png";
import Icons from "../components/ui/Icons";

const Bottombar = () => {
  const location = useLocation();
  const { id } = useParams();

  const bottombarLinks = [
    {
      text: "Astro",
      to: "/Astro",
      icon: Icons.astro,
      activeIcon: Icons.astroActive,
    },
    {
      text: "Order",
      to: "/Order",
      icon: Icons.order,
      activeIcon: Icons.orderActive,
    },
    {
      text: "Home",
      to: "/",
      icon: (
        <img
          src={swastikImg}
          alt="swastik"
          style={{
            height: 50,
            width: 50,
          }}
        />
      ),
    },
    {
      text: "Posts",
      to: "/Post",
      icon: Icons.posts,
      activeIcon: Icons.postsActive,
    },
    {
      text: "Me",
      to: "/Profile",
      icon: Icons.profile,
      activeIcon: Icons.profileActive,
    },
  ];

  const hideBottobar =
    (location.pathname.includes("/Chat/") && location.pathname.includes("/active")) ||
    (location.pathname.includes("/Call/") && location.pathname.includes("/active")) ||
    (location.pathname.includes("/Astro/") && id) ||
    (location.pathname.includes("/Wallet")) ||
    (location.pathname.includes("/Coupons"));

  if (hideBottobar) {
    return null;
  }

  return (
    <div className="p-2 bg-white text-center rounded-top-4 shadow d-lg-none  d-flex justify-content-between align-items-end px-3">
      {bottombarLinks.map((link, index) => {
        if (link.to === "/") {
          return (
            <div className="position-relative" key={index} style={{ width: 65 }}>
              <NavLink to={link.to} className="bottom-nav-link position-absolute start-0 end-0" style={{ marginTop: -50 }}>
                <div>{link.icon}</div>
              </NavLink>
              <NavLink to={link.to} key={index} className="bottom-nav-link">
                <p className="fs-11">{link.text}</p>
              </NavLink>
            </div>
          );
        }

        return (
          <NavLink to={link.to} key={index} className="bottom-nav-link">
            {({ isActive }) => (
              <>
                <div className="px-2">{isActive ? link.activeIcon("fs-5") : link.icon("fs-5 ")}</div>
                <p className="fs-11">{link.text}</p>
              </>
            )}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Bottombar;
