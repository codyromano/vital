import React from 'react';
import PropTypes from 'prop-types';
import './Range.scss';

export default class Range extends React.Component {
	static defaultProps = {
		inputSettings: {
			min: 0,
			max: 100,
			defaultValue: 50
		},
		onChange: () => {}
	};

	static propTypes = {
		inputSettings: PropTypes.shape({
			min: PropTypes.number,
			max: PropTypes.number,
			value: PropTypes.number
		}),
		onChange: PropTypes.func
	};

	constructor(props, context) {
		super(props, context);
		this.onChange = this.onChange.bind(this);
	}

	onChange({ target }) {
		this.props.onValueChanged(target.value);
	}

	render() {
		return (
			<input
				onChange={this.onChange}
				type="range"
				className="range"
				{...this.props.inputSettings}
			/>
		);
	}
}