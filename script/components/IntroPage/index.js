import React from 'react';
import BasePage, { PageWidthContainer } from 'vital-components/BasePage';
import ActionButton from 'vital-components/ActionButton';
import { Link } from 'react-router-dom';

export default class IntroPage extends React.Component {
  render() {
    return (
      <BasePage>
        <PageWidthContainer>
          <p>Increase the intensity of your workout music according
            to how fast you run or bike.</p>
          <ActionButton to="/configure-music">Choose music</ActionButton>
        </PageWidthContainer>
      </BasePage>
    );
  }
}