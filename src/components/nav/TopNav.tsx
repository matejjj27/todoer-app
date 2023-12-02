import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { UIContext } from "../../context/UIProvider";

const TopNav = () => {
  const { isDarkMode, setDarkMode } = useContext(UIContext);

  return (
    <nav className="bg-gray-50 dark:bg-gray-650 fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="nav-item-with-logo">
          <p className="max-sm:text-sm self-center">Menu</p>
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button onClick={() => setDarkMode()} className="pr-2">
            {isDarkMode ? (
              <SunIcon className="h-6 w-6 text-yellow-500" />
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-700" />
            )}
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <p className="max-sm:text-sm self-center">To-doer</p>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
