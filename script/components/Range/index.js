import React from 'react';
import PropTypes from 'prop-types';

export default class Range extends React.Component {
	static defaultProps = {
		min: 0,
		max: 100,
		defaultValue: 50,
		onChange: () => {}
	};

	static propTypes = {
		min: PropTypes.number,
		max: PropTypes.number,
		value: PropTypes.number,
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
			/>
		);
	}
}