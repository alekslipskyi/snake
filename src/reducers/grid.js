import { initGrid, generatePosition, getRightCol, getRightRow } from "src/helpers/grid";
import { DIRECTIONS } from "../constants/common";

export const MOVE = "grid/MOVE";
export const CHANGE_DIRECTION = "grid/CHANGE_DIRECTION";
export const REFRESH = "grid/REFRESH";

const generateInitialData = () => ({
	snake: {
		head: {
			col: generatePosition(),
			row: generatePosition(),
		},
		tail: [],
	},
	food: {
		col: generatePosition(),
		row: generatePosition(),
	},
	score: 0,
	isStop: false,
	direction: DIRECTIONS.LEFT
});

const initialState = {
	cells: initGrid(),
	...generateInitialData()
};

export default function(state = initialState, action) {
	switch (action.type) {
		case MOVE: return getNewState(state);
		case CHANGE_DIRECTION:
			return {
				...state,
				direction: action.newDirection,
			};
		case REFRESH: return { ...state, ...generateInitialData() };
		default:
			return state;
	}
}

const getNewPosition = (direction, snakePosition) => {
	let col = 0;
	let row = 0;

	switch (direction) {
		case DIRECTIONS.TOP: row = -1; break;
		case DIRECTIONS.BOTTOM: row = 1; break;
		case DIRECTIONS.LEFT: col = -1; break;
		case DIRECTIONS.RIGHT: col = 1; break;
	}

	return {
		head: {
			col: getRightCol(snakePosition.col + col),
			row: getRightRow(snakePosition.row + row)
		},
	}
};

const isFoodEaten = (snakePosition, foodPosition) => {
	const { head } = snakePosition;

	return foodPosition.col === head.col && foodPosition.row === head.row;
};

const isGameOver = (snakePosition, tail) => {
	return tail.some(pos => snakePosition.col === pos.col && snakePosition.row === pos.row);
};

const getNewState = state => {
	const newState = {};
	let newTail = [...state.snake.tail];

	const nextSnakePosition = getNewPosition(state.direction, state.snake.head);

	if (isFoodEaten(nextSnakePosition, state.food)) {
		newState.score = state.score + 1;
		newState.food = {
			col: generatePosition(),
			row: generatePosition(),
		};
		newTail.push(state.snake.head);
	}

	if (state.snake.tail.length) {
		newTail = [state.snake.head, ...newTail.slice(0, -1)];
	}

	return {
		...state,
		...newState,
		isStop: isGameOver(nextSnakePosition.head, state.snake.tail),
		snake: {
			tail: newTail,
			...nextSnakePosition
		},
	}
};

export const refresh = () => ({ type: REFRESH });

export const changeDirection = newDirection => ({ type: CHANGE_DIRECTION, newDirection });

export const move = () => ({ type: MOVE });
