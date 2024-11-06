import { useLocation } from "react-router-dom";

const Page = ({ children }) => {
  const { pathname } = useLocation();
  let options = pathname.split("/");
  if (options.length === 2 && options[1] === "") options = [options[0]];
  options = options.map((o) => (o === "" ? "Dashboard" : o));

  return (
    <div className=" p-3 p-lg-5  h-100 overflow-y-auto ">

      {children}

    </div>
  );
};

export default Page;