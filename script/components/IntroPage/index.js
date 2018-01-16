import React from 'react';
import BasePage, { PageWidthContainer } from 'vital-components/BasePage';
import ActionButton from 'vital-components/ActionButton';
import { Link } from 'react-router-dom';
import './IntroPage.scss';

export default class IntroPage extends React.Component {
  componentDidMount() {
    this.vid.play();
  }
  render() {
    return (
      <main className="intro-page full-screen">
      <video
        className="run-video full-screen"
        ref={(vid) => {this.vid = vid; }}
        controls={false}
        loop={true}
        autoplay={true}>
        <source
          autoplay={true}
          width={'100%'}
          src="https://giant.gfycat.com/SadColorlessFlicker.webm"
          type="video/webm"/>
      </video>

        <div className="intro-content full-screen">
          <PageWidthContainer>
            <h1 class="logo">DataBass</h1>

            <p>DataBass increases the intensity of your workout
            music according to your performance.</p>

            <p>The faster you run, the stronger the beats.</p>

            <div className="cta-wrapper">
              <ActionButton to="/configure-music">Choose a song</ActionButton>
            </div>
          </PageWidthContainer>
        </div>
      </main>
    );
  }
}
