import React from 'react';
import PropTypes from 'prop-types';

const DefaultPropsLoadingComponent = () => (<div>Loading</div>);
const DefaultPropsLoadErrorComponent = () => (<div>Load error</div>);

const reactComponentShape = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.node
]);

class WithPropsLoading extends React.Component {
  static propTypes = {
    // A custom method that resolves props to be provided to a child
    // component. It is invoked with "resolve" and "reject," like a Promise
    resolvePropsMethod: PropTypes.func.isRequired,
    // Displayed after loading succeeds
    propsResolvedComponent: reactComponentShape.isRequired,

    // Optional presentational components for load/error states
    propsLoadingComponent: reactComponentShape,
    propsLoadErrorComponent: reactComponentShape
  };

  static defaultProps = {
    loadingComponent: DefaultPropsLoadingComponent,
    loadErrorComponent: DefaultPropsLoadErrorComponent
  };

  static STATUS_ERROR = 1;
  static STATUS_IDLE = 2;
  static STATUS_OK = 3;
  static STATUS_PENDING = 4;

  constructor(props) {
    super(props);

    // Assign status directly instead of using state because
    // setState is asynchronous, and we need immediate updates
    this.status = WithPropsLoading.STATUS_IDLE;
    this.state = {
      resolvedProps: {}
    };

    this.renderComponentMap = {
      [WithPropsLoading.STATUS_IDLE]: props.loadingComponent,
      [WithPropsLoading.STATUS_PENDING]: props.loadingComponent,
      [WithPropsLoading.STATUS_OK]: props.propsResolvedComponent,
      [WithPropsLoading.STATUS_ERROR]: props.loadErrorComponent
    };

    this.onPropsResolved = this.onPropsResolved.bind(this);
    this.onPropsResolutionFailed = this.onPropsResolutionFailed.bind(this);
  }
  onPropsResolved(resolvedProps) {
    this.status = WithPropsLoading.STATUS_OK;
    this.setState({
      resolvedProps
    });
  }
  onPropsResolutionFailed(result) {
    this.status = WithPropsLoading.STATUS_ERROR;
    this.forceUpdate();
  }
  componentDidMount() {
    this.status = WithPropsLoading.STATUS_PENDING;
    this.props.resolvePropsMethod(
      this.onPropsResolved,
      this.onPropsResolutionFailed,
      this.props
    );
  }
  componentWillUnmount() {
    delete this.status;
    delete this.renderComponentMap;
  }
  render() {
    console.log(this.status);
    console.log(this.renderComponentMap);

    const Component = this.renderComponentMap[this.status];
    return (<Component {...this.state.resolvedProps} />);
  }
};

export default WithPropsLoading;
