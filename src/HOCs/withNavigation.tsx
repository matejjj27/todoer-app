import React, { useState } from "react";
import SideNav from "../components/nav/SideNav";
import UIModeSwitch from "../components/UIModeSwitch";

const withNavigation = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithNavigation: React.FC<P> = (props) => {
    const storedIsSideNavOpened = localStorage.getItem("isSideNavOpened");
    const [isSideNavOpened, setIsSideNavOpened] = useState(
      JSON.parse(storedIsSideNavOpened || "true")
    );

    const toggleSideNav = () => {
      localStorage.setItem("isSideNavOpened", JSON.stringify(!isSideNavOpened));
      setIsSideNavOpened(!isSideNavOpened);
    };

    return (
      <>
        <SideNav
          isSideNavOpened={isSideNavOpened}
          toggleSideNav={toggleSideNav}
        />
        <UIModeSwitch />

        <WrappedComponent
          {...props}
          isSideNavOpened={isSideNavOpened}
          toggleSideNav={toggleSideNav}
        />
      </>
    );
  };

  return WithNavigation;
};

export default withNavigation;
