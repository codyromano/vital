import React from 'react';
import PropTypes from 'prop-types';
import './LoadProgressIndicator.scss';

const reactComponentShape = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.node
]);

class TimedContentBox extends React.Component {
  static propTypes = {
    currentContentIndex: PropTypes.number,
    timeBetweenContent: PropTypes.number,
    content: PropTypes.arrayOf(
      reactComponentShape
    ).isRequired
  };
  static defaultProps = {
    timeBetweenContent: 2500,
    currentContentIndex: 0,
    jitter: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      currentContentIndex: props.currentContentIndex
    };
  }

  getNextTime() {
    return this.props.timeBetweenContent + (Math.random() * this.props.jitter);
  }

  componentDidMount() {
    this.cycleContent = window.setInterval(() => {
      const newContentIndex = this.state.currentContentIndex + 1;
      this.setState({
        currentContentIndex: Math.min(this.props.content.length - 1, newContentIndex)
      });
    }, this.props.timeBetweenContent);
  }

  componentWillUnmount() {
    window.clearInterval(this.cycleContent);
  }

  render() {
    const Component = this.props.content[this.state.currentContentIndex];
    return (
      <Component {...this.props} />
    );
  }
}

const loadingContent = [
  'Requesting data',
  'Downloading',
  'Decoding response',
  'Analyzing waveform',
  'Applying filters',
  'Generating visual'
].map(message => (props) => (<span>{message}</span>));

const LoadProgressIndicator = () => (
  <div className="load-progress-indicator">
    <p className="load-progress-indicator-message">
      <TimedContentBox
        jitter={2000}
        timeBetweenContent={2000}
        content={loadingContent}
      />
    </p>
  </div>
);

export default LoadProgressIndicator;
