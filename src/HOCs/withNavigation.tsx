import React from "react";
import SideNav from "../components/nav/SideNav";

const withNavigation = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithNavigation: React.FC<P> = (props) => (
    <div className="flex flex-col min-h-screen bg-gray-600">
      <SideNav />
      <WrappedComponent {...props} />
    </div>
  );

  return WithNavigation;
};

export default withNavigation;
