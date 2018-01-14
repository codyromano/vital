import React from 'react';
import BasePage, { PageWidthContainer } from 'vital-components/BasePage';
import { Link } from 'react-router-dom';

export default class IntroPage extends React.Component {
  render() {
    return (
      <BasePage>
        <PageWidthContainer>
          <p>Increase the intensity of your workout music according
            to how fast you run or bike.</p>
          <Link to="/configure-music">Choose music</Link>
        </PageWidthContainer>
      </BasePage>
    );
  }
}