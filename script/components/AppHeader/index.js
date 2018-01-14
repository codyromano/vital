import React from 'react';
import BasePage, { PageWidthContainer } from 'vital-components/BasePage';
import './AppHeader.scss';

const AppHeader = ({ headerBottomPadding }) => {
  const className = ['app-header'];

  if (headerBottomPadding) {
    className.push('app-header-padding');
  }

  return (<header className={className.join(' ')}>
    <PageWidthContainer>
      {/* TODO: Create standalone component for logo */}
      <h1 className="logo">DataBass</h1>
    </PageWidthContainer>
  </header>);
};

export default AppHeader;
