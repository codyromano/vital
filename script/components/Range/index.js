import React from 'react';
import PropTypes from 'prop-types';
import MetricDisplay from 'vital-components/MetricDisplay';
import './Range.scss';

export default class Range extends React.Component {
	static defaultProps = {
		inputSettings: {
			min: 0,
			max: 100,
			defaultValue: 50
		},
		onChange: () => {},
		step: 25,
		precision: 0
	};

	static propTypes = {
		inputSettings: PropTypes.shape({
			min: PropTypes.number,
			max: PropTypes.number,
			value: PropTypes.number
		}),
		onChange: PropTypes.func,
		step: PropTypes.number,
		precision: PropTypes.number
	};

	constructor(props, context) {
		super(props, context);
		this.onChange = this.onChange.bind(this);

		this.state = {
			value: props.value
		};

		this.increase = this.increase.bind(this);
		this.decrease = this.decrease.bind(this);
	}

	onChange({ target }) {
		this.props.onValueChanged(target.value);
	}

	// TODO: increase and decrease can be a single method with
	// a step parameter
	increase(event) {
		event.preventDefault();
		const newValue = Math.min(
			this.state.value + this.props.step,
			this.props.max
		);
		this.setState({
			value: newValue
		});
		this.props.onUpdateValue(newValue);
	}

	decrease(event) {
		event.preventDefault();
		const newValue = Math.max(
			this.state.value - this.props.step,
			this.props.min
		);
		this.setState({
			value: newValue
		});
		this.props.onUpdateValue(newValue);
	}

	render() {
		const isMinimum = this.state.value === this.props.min;
		const isMaximum = this.state.value === this.props.max;

		const minClass = ['metric-range-button'];
		(isMinimum && minClass.push('metric-range-button-hidden'));

		const maxClass = ['metric-range-button'];
		(isMaximum && maxClass.push('metric-range-button-hidden'));

		return (
			<div className="metric-range">
				<button
					className={minClass.join(' ')}
					onClick={this.decrease}
				>-</button>

				<div className="metric-display-range-wrapper">
					<MetricDisplay
						metric={this.state.value}
						precision={this.props.precision}
						size={'large'}
						unit={this.props.metricLabel}
					/>
				</div>

				<button
					className={maxClass.join(' ')}
					onClick={this.increase}
				>+</button>
			</div>
		);
		/*
		return (
			<input
				onChange={({ target }) => this.props.onUpdateValue(target.value) }
				type="range"
				className="range"
				{...this.props.inputSettings}
			/>
		);
		*/
	}
}
