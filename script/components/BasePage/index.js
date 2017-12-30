import React from 'react';
import PropTypes from 'prop-types';
import './BasePage.scss';

export const PageWidthContainer = ({ children }) => (
  <div className="page-width-container">
    {children}
  </div>
);

export default class BasePage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <main>
        {this.props.children}
      </main>
    );
  }
}
