import React, { Component } from "react";
import Grid from "src/containers/Grid";
import Header from "src/containers/Header";
import "./index.scss";

export default class App extends Component {
	render() {
		return (
			<div className="root_container">
				<Header/>
				<Grid/>
			</div>
		)
	}
}
