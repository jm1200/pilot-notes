import React from "react";

interface ISecondaryNavProps {}
const SecondaryNav: React.FC<ISecondaryNavProps> = props => {
  return (
    <div className="secondary-nav">
      <h4>SecondaryNav Component</h4>
    </div>
  );
};

export default SecondaryNav;
