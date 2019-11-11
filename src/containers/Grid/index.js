import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import getClassName from "classnames";
import { DIRECTIONS, KEY_MAP } from "src/constants/common";
import { move, changeDirection } from "src/reducers/grid";
import Swipe from "src/helpers/swipe";
import "./index.scss";

@connect(({ grid: { cells, snake, food, direction, isStop } }) => ({
	cells,
	snake,
	isStop,
	food,
	direction,
}), { move, changeDirection })

class Grid extends Component {
	static timeToMove = 200;
	swipe = new Swipe();

	static propTypes = {
		cells: PropTypes.array,
		snake: PropTypes.shape({
			head: PropTypes.shape({
				col: PropTypes.number,
				row: PropTypes.number
			}),
			tail: PropTypes.arrayOf(PropTypes.shape({ col: PropTypes.number, row: PropTypes.number }))
		}),
		food: PropTypes.shape({ col: PropTypes.number, row: PropTypes.number }),
		direction: PropTypes.oneOf(Object.values(DIRECTIONS)),
		move: PropTypes.func,
		isStop: PropTypes.bool,
		changeDirection: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.intervalToMove = setInterval(this.props.move, Grid.timeToMove);
		this.swipe.on(this.props.changeDirection);
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.isStop && this.props.isStop) {
			this.swipe.off();
			clearInterval(this.intervalToMove);
		} else if (prevProps.isStop && !this.props.isStop) {
			this.swipe.on(this.props.changeDirection);
			this.intervalToMove = setInterval(this.props.move, Grid.timeToMove);
		}
	}

	componentDidMount() {
		document.addEventListener("keydown", this.handleKey);
	}

	componentWillUnmount() {
		this.swipe.destroy();
		document.removeEventListener("keydown", this.handleKey);
	}

	handleKey = e => {
		const { isStop, changeDirection, move } = this.props;

		if (e.which === this.lastWhich || isStop) return;
		clearInterval(this.intervalToMove);

		if (KEY_MAP[e.which]) changeDirection(KEY_MAP[e.which]);

		this.intervalToMove = setInterval(move, Grid.timeToMove);
		this.lastWhich = e.which;
	};

	getEssence = cell => {
		const { snake: { head, tail }, food, direction } = this.props;
		return {
			[`snake head_${direction}`]: cell.row === head.row && cell.col === head.col,
			"snake": tail.some(pos => cell.row === pos.row && cell.col === pos.col),
			"food": cell.row === food.row && cell.col === food.col,
		}
	};

	render() {
		const { cells } = this.props;
		return (
			<div className="grid_container">
				{cells.map(row => row.map(cell => <div className={getClassName(this.getEssence(cell))} key={cell.row + cell.col} /> ))}
			</div>
		)
	}
}

export default Grid;
