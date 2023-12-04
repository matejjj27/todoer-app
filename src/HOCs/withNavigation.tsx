import React, { useState } from "react";
import SideNav from "../components/nav/SideNav";
import UIModeSwitch from "../components/UIModeSwitch";

const withNavigation = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithNavigation: React.FC<P> = (props) => {
    const [isSideNavOpened, setIsSideNavOpened] = useState(true);

    return (
      <>
        <SideNav
          isSideNavOpened={isSideNavOpened}
          toggleSideNav={() => setIsSideNavOpened((prev) => !prev)}
        />
        <UIModeSwitch />

        <WrappedComponent
          {...props}
          isSideNavOpened={isSideNavOpened}
          toggleSideNav={() => setIsSideNavOpened((prev) => !prev)}
        />
      </>
    );
  };

  return WithNavigation;
};

export default withNavigation;
