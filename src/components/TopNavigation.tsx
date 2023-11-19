import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoSvg from "./LogoSvg";
import { ReactSVG } from "react-svg";
import avatarMaleSvg from "../assets/avatar-male.svg";

const navCategories = [
  { path: "/", label: "Today" },
  { path: "/", label: "Tomorrow" },
  { path: "/", label: "This Week" },
  { path: "/", label: "This Month" }
];

const TopNavigation = () => {
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState("Today");
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="nav-wrapper">
      <div className="nav-item-with-logo">
        <LogoSvg />
        {!isMobile && <p className="max-sm:text-sm self-center">Todos</p>}
      </div>

      <div className="flex justify-center gap-5">
        {navCategories.map(({ path, label }) => (
          <p
            key={label}
            className={`nav-item ${
              label === selectedCategory ? "selected" : ""
            }`}
            onClick={() => {
              navigate(path);
              setSelectedCategory(label);
            }}
          >
            {label}
          </p>
        ))}
      </div>

      <div className="nav-item-with-logo">
        <ReactSVG
          src={avatarMaleSvg}
          beforeInjection={(svg) => {
            svg.setAttribute("style", "height: 34px; width: 34px");
          }}
        />
      </div>
    </nav>
  );
};

export default TopNavigation;
