import {COL_SIZE, ROW_SIZE} from "../constants/common";

export function initGrid() {
	const cols = [];

	for (let row = 0; row <= ROW_SIZE; row++) {
		const rows = [];

		for (let col = 0; col <= COL_SIZE; col++) {
			rows.push({ row, col });
		}

		cols.push(rows);
	}

	return cols;
}

export const getRightCol = col => {
	if (col > COL_SIZE) return 0;
	if (col < 0) return COL_SIZE;
	return col;
};

export const getRightRow = row => {
	if (row > ROW_SIZE) return 0;
	if (row < 0) return ROW_SIZE;
	return row;
};

export const generatePosition = (occupiedPositions) => {
	const position = Math.floor(Math.random() * (Math.max(COL_SIZE, ROW_SIZE) - 2)) + 1;

	if (occupiedPositions && occupiedPositions.includes(position)) {
		return generatePosition(occupiedPositions);
	} else return position;
};
