import React from 'react';
import WithPropsLoading from './WithPropsLoading';

const withPropsLoadingFactory = ({
  resolvePropsMethod
}) => Component => (props) => (
  <WithPropsLoading
    propsResolvedComponent={Component}
    resolvePropsMethod={resolvePropsMethod}
    {...props}
  />
);

export default withPropsLoadingFactory;
