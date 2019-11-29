import React, { MouseEventHandler } from "react";
import { Icon } from "react-feather";
import { ActionButton } from "./FooterActionButton.styles";

// import { iconColor } from 'constants/index'

export interface FooterActionButtonProps {
  disabled?: boolean;
  handler: MouseEventHandler;
  icon: Icon;
  label: string;
}

const FooterActionButton: React.FC<FooterActionButtonProps> = props => {
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
        size={40}
        className="action-button-icon"
        //   color={iconColor}
        aria-hidden="true"
        focusable="false"
      />
    </ActionButton>
  );
};

export default FooterActionButton;
