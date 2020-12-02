import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class DashboardMovieRow extends React.Component {
	constructor(props) {
		super(props);
	}

	/* ---- Q1b (Dashboard) ---- */
	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a movie row. */


	render() {
		return (
			<>
			<div className="location">
				<div className="name">{this.props.name}</div>
			</div>
			{/* <button type="button" class="btn btn-info" onClick={() => this.submitPOIS(this.props.lat, this.props.lon, this.props.dist)}>Select</button> */}
			</>
		);
	}
}
