import React from 'react';
import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import Map from './Map';
import Autocomplete from './Autocomplete';
import ResultCells from './ResultCells';
import { Button } from '@material-ui/core';


export default class Recommendations extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			startPosition: undefined,
			endPosition: undefined,
			cellsData: undefined
		}

		this.getPrices = this.getPrices.bind(this);
		this.addressSelectedStart = this.addressSelectedStart.bind(this);
		this.addressSelectedEnd = this.addressSelectedEnd.bind(this);
	}

	addressSelectedStart(latLng) {
		console.log(latLng);
		this.setState({ startPosition: latLng });
	}

	addressSelectedEnd(latLng) {
		console.log(latLng);
		this.setState({ endPosition: latLng });
	}

	getPrices() {
		console.log("getting prices");
		if (this.state.startPosition === undefined || this.state.endPosition === undefined) {
			alert("Please provide valid locations for both start and destination");
		} else {
			let date = new Date();
			let hour = date.getHours();
			console.log(hour);
			let start = this.state.startPosition;
			let end = this.state.endPosition;
			Promise.all([
				fetch(`http://localhost:8081/lyftPrice/${start.lat}/${start.lng}/${end.lat}/${end.lng}`, {method: 'GET'}),
				fetch(`http://localhost:8081/taxiPrice/${start.lat}/${start.lng}/${end.lat}/${end.lng}/${hour}`, {method: 'GET'}),
				fetch(`http://localhost:8081/subwayStops/${start.lat}/${start.lng}/${end.lat}/${end.lng}`, {method: 'GET'}),
			]).then(function (responses) {
				return Promise.all(responses.map(function (response) {
					return response.json();
				}));
			}).then( data => {
				console.log(data);
				let dataObj = {lyft: data[0][0], taxi: data[1][0], subway: data[2][0]}
				console.log(dataObj);
				this.setState({ cellsData: dataObj });
			}).catch(function (error) {
				console.log(error);
			});
		}
	}

	render() {
		return (
			<div className="Recommendations">
				<PageNavbar active="recommendations" />
				<div className="sidepanel">
					<div className="location-input">
						<h6>start: </h6> <Autocomplete addressSelected={this.addressSelectedStart} />
						<br />
						<h6>destination: </h6><Autocomplete addressSelected={this.addressSelectedEnd} />
						<br />
						<Button variant="contained" color="primary" onClick={this.getPrices}>Get Prices</Button>
					</div>
					{this.state.cellsData!==undefined && <ResultCells cellsData={this.state.cellsData}/>}
				</div>
				<div className="map">
					<Map start={this.state.startPosition} end={this.state.endPosition}/>
				</div>
			</div>
		);
	}
}
