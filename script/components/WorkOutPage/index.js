import React from 'react';
import PropTypes from 'prop-types';
import BasePage, { PageWidthContainer } from 'vital-components/BasePage';
import './WorkOutPage.scss';

export default class WorkOutPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <BasePage>
        <PageWidthContainer>
          Workout
        </PageWidthContainer>
      </BasePage>
    );
  }
}
