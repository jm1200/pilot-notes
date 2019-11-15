import React, { MouseEventHandler } from "react";
import { Icon } from "react-feather";

// import { iconColor } from 'constants/index'

export interface MainNavActionButtonProps {
  disabled?: boolean;
  handler: MouseEventHandler;
  icon: Icon;
  label: string;
}

const MainNavActionButton: React.FC<MainNavActionButtonProps> = props => {
  const { disabled = false, handler, icon: IconCmp, label } = props;
  return (
    <button
      className="action-button"
      aria-label={label}
      onClick={handler}
      disabled={disabled}
      title={label}
      data-testid={label}
    >
      <span>
        <IconCmp
          size={18}
          className="main-nav-action-button-icon"
          //   color={iconColor}
          aria-hidden="true"
          focusable="false"
        />
      </span>
    </button>
  );
};

export default MainNavActionButton;
