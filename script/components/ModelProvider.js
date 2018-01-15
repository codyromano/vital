import React from 'react';
import PropTypes from 'prop-types';

const modelApiShape = {
  model: PropTypes.object.isRequired,
  updateModel: PropTypes.func.isRequired,
  _subscribe: PropTypes.func
};

class ModelProvider extends React.Component {
  static propTypes = {
    hydrate: PropTypes.func,
    persist: PropTypes.func
  };

  static defaultProps = {
    hydrate: () => Promise.resolve({}),
    persist: () => Promise.resolve({valid: true})
  };

  static childContextTypes = modelApiShape;

  constructor(props, context) {
    super(props, context);

    this.hydrated = false;
    this.model = {};

    this.persistModel = this.persistModel.bind(this);
    this.updateModel = this.updateModel.bind(this);
  }

  getChildContext() {
    return {
      model: {...this.model},
      updateModel: this.updateModel
    };
  }

  updateModel(key, value) {
    const newModel = {
      ...this.model,
      [key]: value
    };
    this.model = newModel;
    return this.persistModel(model);
  }

  persistModel() {
    return this.props.persist(this.model);
  }

  hydrateModel() {
    this.props.hydrate().then((newData) => {
      const newModel = {...newData, ...this.model};
      this.hydrated = true;
      this.model = newModel;
    });
  }

  componentDidMount() {
    this.hydrateModel();
  }

  render() {
    if (this.hydrated) {
      return this.props.children;
    }
    return (<div>Loading</div>);
  }
}

class WrappedWithModel extends React.Component {
  render() {
    const { Component } = this.props;

    return (
      <Component
        updateModel={this.context.updateModel}
        model={this.context.model}
        {...this.props}
      />
    );
  }
}

WrappedWithModel.contextTypes = modelApiShape;

const withModel = (Component) => (props) => (
  <WrappedWithModel
    Component={Component}
    {...props}
  />
);

export { withModel };
export default ModelProvider;
