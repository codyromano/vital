import React from 'react';
import PropTypes from 'prop-types';
import MetricDisplay from 'vital-components/MetricDisplay';
import { modelApiShape } from 'vital-components/ModelProvider';
import { clamp } from 'vital-utils/mathUtils';
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
		precision: 0,
		formatMetric: (value) => value
	};

	static propTypes = {
		inputSettings: PropTypes.shape({
			min: PropTypes.number,
			max: PropTypes.number
		}),
		onChange: PropTypes.func,
		step: PropTypes.number,
		precision: PropTypes.number,
		formatMetric: PropTypes.func,
		...modelApiShape
	};

	constructor(props, context) {
		super(props, context);

		this.increase = this.adjustValue.bind(this, props.step);
		this.decrease = this.adjustValue.bind(this, -props.step);
	}

	adjustValue(step, event) {
		event.preventDefault();
		const newValue = clamp(
			this.props.ownModelValue + step,
			this.props.min,
			this.props.max
		);
		this.props.updateModel(this.props.id, newValue);
	}

	render() {
		const isMinimum = this.props.ownModelValue === this.props.min;
		const isMaximum = this.props.ownModelValue === this.props.max;

		const minClass = ['metric-range-button'];
		(isMinimum && minClass.push('metric-range-button-hidden'));

		const maxClass = ['metric-range-button'];
		(isMaximum && maxClass.push('metric-range-button-hidden'));

		const formattedMetric = this.props.formatMetric(
			this.props.ownModelValue
		);

		return (
			<div className="metric-range">
				<button
					className={minClass.join(' ')}
					onClick={this.decrease}
				>-</button>

				<div className="metric-display-range-wrapper">
					<MetricDisplay
						metric={formattedMetric}
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
	}
}
