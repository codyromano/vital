import React from 'react';
import PropTypes from 'prop-types';
import Form from 'vital-components/Form';
import { Link, withRouter } from 'react-router-dom';
import BasePage, { PageWidthContainer } from 'vital-components/BasePage';
import errorDefinitions from './errorDefinitions';
import './ErrorPage.scss';

const ErrorPage = ({
  match: {
    params: {
      errorType
    }
  }
}) => {
  const contentKey = errorDefinitions[errorType] ? errorType : 'default';
  const content = errorDefinitions[contentKey];

  return (
    <BasePage>
      <PageWidthContainer>
        <p>{content.message}</p>
        <Link to={content.nextStepButtonUrl}>
          {content.nextStepButtonText}
        </Link>
      </PageWidthContainer>
    </BasePage>
  );
};

export default withRouter(ErrorPage);
