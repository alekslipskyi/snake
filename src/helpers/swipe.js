import { DIRECTIONS } from "src/constants/common";

export default class Swipe {
	constructor() {
		document.addEventListener('touchstart', this.handleTouchStart);
		document.addEventListener('touchmove', this.handleTouchMove);
	}

	destroy() {
		document.removeEventListener('touchstart', this.handleTouchStart);
		document.removeEventListener('touchmove', this.handleTouchMove);
	}

	off = () => this.cb = null;

	on = (cb) => this.cb = cb;

	handleTouchStart = (evt) => {
		const firstTouch = evt.touches[0];
		this.xDown = firstTouch.clientX;
		this.yDown = firstTouch.clientY;
	};

	handleTouchMove = (evt) => {
		evt.preventDefault();
		if (!this.xDown || !this.yDown || !this.cb) return;

		const xUp = evt.touches[0].clientX;
		const yUp = evt.touches[0].clientY;

		const xDiff = this.xDown - xUp;
		const yDiff = this.yDown - yUp;

		if (Math.abs(xDiff) > Math.abs(yDiff)) {
			if (xDiff > 0) this.cb(DIRECTIONS.LEFT);
			else this.cb(DIRECTIONS.RIGHT);
		} else {
			if (yDiff > 0) this.cb(DIRECTIONS.TOP);
			else this.cb(DIRECTIONS.BOTTOM);
		}

		this.xDown = null;
		this.yDown = null;
	};
}

