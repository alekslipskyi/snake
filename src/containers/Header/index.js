import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { refresh } from "../../reducers/grid";
import "./index.scss";

@connect(({ grid: { score } }) => ({ score }), { refresh })

class Header extends PureComponent {
	static propTypes = {
		score: PropTypes.number,
		refresh: PropTypes.func,
	};

	render() {
		const { score, refresh } = this.props;

		return (
			<div className="header">
				<div className="header_score">Score: {score}</div>
				<div className="header_refresh" onClick={refresh}>Refresh</div>
			</div>
		)
	}
}

export default Header;
