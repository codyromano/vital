import React from 'react';
import PropTypes from 'prop-types';
import BasePage, { PageWidthContainer } from 'vital-components/BasePage';
import { Link } from 'react-router-dom';
import './ActionButton.scss';

const ActionButton = (props) => {
  const className = ['action-button'];
  if (props.isPrimary) {
    className.push('action-button-primary');
  }

  const buttonProps = {
    className: className.join(' '),
    onClick: props.onClick
  };

  if (props.to) {
    return (
      <Link
        to={props.to}
        className={className.join(' ')}
      >{props.children}</Link>
    );
  }
  return (
    <button {...buttonProps}>{props.children}</button>
  );
};

ActionButton.defaultProps = {
  isPrimary: true,
  href: null,
  onClick: () => {}
};

ActionButton.propTypes = {
  isPrimary: PropTypes.bool
};

export default ActionButton;
