import React from 'react';
import BasePage, { PageWidthContainer } from 'vital-components/BasePage';
import { Link } from 'react-router-dom';
import './ActionButton.scss';

const ActionButton = (props) => {
  const buttonProps = {
    className: 'action-button',
    ...props
  };

  if (props.to) {
    return (
      <Link {...buttonProps}>{props.children}</Link>
    );
  }
  return (
    <button {...buttonProps}>{props.children}</button>
  );
};

ActionButton.defaultProps = {
  href: null,
  onClick: () => {}
};

export default ActionButton;
