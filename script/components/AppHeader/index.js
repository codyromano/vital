import React from 'react';
import BasePage, { PageWidthContainer } from 'vital-components/BasePage';
import './AppHeader.scss';

const AppHeader = () => (
  <header className="app-header">
    <PageWidthContainer>
      {/* TODO: Create standalone component for logo */}
      <h1 className="logo">DataBass</h1>
    </PageWidthContainer>
  </header>
);

export default AppHeader;
