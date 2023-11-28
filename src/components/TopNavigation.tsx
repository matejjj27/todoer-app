import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoSvg from "./LogoSvg";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const navCategories = [
  { path: "/", label: "Today" },
  { path: "/", label: "Tomorrow" },
  { path: "/", label: "This Week" },
  { path: "/", label: "This Month" }
];

const TopNavigation = () => {
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState("Today");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const body = document.body;
    const darkModeStored = localStorage.getItem("darkMode") === "true";
    body.classList.toggle("dark", darkModeStored);
    setDarkMode(darkModeStored);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDarkMode = () => {
    const body = document.body;
    body.classList.toggle("dark");
    const isDarkMode = body.classList.contains("dark");
    setDarkMode(isDarkMode);
    localStorage.setItem("darkMode", String(isDarkMode));
  };

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
        <button onClick={toggleDarkMode} className="p-2">
          {darkMode ? (
            <SunIcon className="h-6 w-6 text-yellow-500" />
          ) : (
            <MoonIcon className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default TopNavigation;
