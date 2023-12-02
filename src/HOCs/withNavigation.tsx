import React from "react";

const withNavigation = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  NavigationComponent: React.ComponentType
) => {
  const WithNavigation: React.FC<P> = (props) => (
    <div className="bg-gray-600">
      <NavigationComponent />
      <WrappedComponent {...props} />
    </div>
  );

  return WithNavigation;
};

export default withNavigation;
