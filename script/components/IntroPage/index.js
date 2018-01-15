import React from 'react';
import BasePage, { PageWidthContainer } from 'vital-components/BasePage';
import ActionButton from 'vital-components/ActionButton';
import { Link } from 'react-router-dom';

export default class IntroPage extends React.Component {
  render() {
    return (
      <BasePage>
        <PageWidthContainer>
          <p>DataBass increases the intensity of your workout music 
            as you're running or biking.</p>

          <p>Go fast to increase the tempo and bass. If you slow
            down, so will your music.</p>

          <ActionButton to="/configure-music">Choose a song</ActionButton>
        </PageWidthContainer>
      </BasePage>
    );
  }
}