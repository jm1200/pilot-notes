import React, { MouseEventHandler } from "react";
import { Icon } from "react-feather";
import { ActionButton } from "./MainNavActionButton.styles";

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
    <ActionButton
      className="action-button"
      aria-label={label}
      onClick={handler}
      disabled={disabled}
      title={label}
      data-testid={label}
    >
      <IconCmp
        size={20}
        className="action-button-icon"
        //   color={iconColor}
        aria-hidden="true"
        focusable="false"
      />
    </ActionButton>
  );
};

export default MainNavActionButton;
