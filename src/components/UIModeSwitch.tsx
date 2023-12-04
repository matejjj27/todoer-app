import { useContext } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { UIContext } from "../context/UIProvider";

function UIModeSwitch() {
  const { isDarkMode, setDarkMode } = useContext(UIContext);

  return (
    <div className="absolute right-5 top-6 bg-transparent">
      <button
        onClick={() => setDarkMode()}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-650 group pr-2"
      >
        {isDarkMode ? (
          <SunIcon className="h-6 w-6 text-yellow-500" />
        ) : (
          <MoonIcon className="h-6 w-6 text-gray-700" />
        )}
      </button>
    </div>
  );
}

export default UIModeSwitch;
