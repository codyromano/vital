import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from 'vital-components/AppHeader';
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
        <AppHeader
          headerBottomPadding={this.props.headerBottomPadding}
        />
        <section className="app-body">
          {this.props.children}
        </section>
      </main>
    );
  }
}

BasePage.defaultProps = {
  headerBottomPadding: true
};

BasePage.propTypes = {
  headerBottomPadding: PropTypes.bool
};
