import { ComponentWithSideNav } from "../utils/types.ts";
import withNavigation from "../HOCs/withNavigation.tsx";

const Home = ({ isSideNavOpened }: ComponentWithSideNav) => {
  return (
    <div
      className={`min-h-screen bg-white dark:bg-gray-850 py-7 p- ${
        isSideNavOpened ? "pl-64" : "pl-0"
      } max-sm:pl-0`}
    >
      <h1
        className={`dark:text-white text-3xl pl-3 ${
          !isSideNavOpened ? "ml-16" : ""
        }`}
      >
        Home
      </h1>
      <div className="flex justify-center gap-5 flex-wrap border-2 rounded-lg ml-2 mr-5 p-5 my-8 border-gray-350 dark:border-gray-900"></div>
    </div>
  );
};

const HomeWithNavigation = withNavigation(Home);
export default HomeWithNavigation;
