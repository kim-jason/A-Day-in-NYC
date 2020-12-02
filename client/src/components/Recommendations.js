// import React from 'react';
// import '../style/Recommendations.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import PageNavbar from './PageNavbar';
// import { Map, GoogleApiWrapper } from 'google-maps-react';
// import ResultCells from './ResultCells';

// const mapStyles = {
//   width: '100%',
//   height: '100%'
// };


// class MapContainer extends React.Component {
// 	constructor(props) {
// 		super(props);

// 		//google maps api key: AIzaSyApINK6lyjup-OdNACkI2OpUhQWGeJ1n-I

// 		// State maintained by this React component is the selected movie name,
// 		// and the list of recommended movies.
// 		this.state = {
// 			movieName: "",
// 			recMovies: []
// 		}

// 	}

// 	render() {

// 		return (
// 			<div className="Recommendations">
// 				<PageNavbar active="recommendations" />
// 				<div className="sidepanel">
// 					<ResultCells/>
// 				</div>
// 				<div className="map">
// 				<Map
//         			google={this.props.google}
//         			zoom={14}
//         			style={mapStyles}
//         			initialCenter={{lat: -1.2884,lng: 36.8233}}
//       			/>
// 				</div>
// 		    </div>
// 		);
// 	}
// }

// export default GoogleApiWrapper({
// 	apiKey: 'AIzaSyApINK6lyjup-OdNACkI2OpUhQWGeJ1n-I'
//   })(MapContainer);

import React from 'react';
import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import Map from './Map';
import Autocomplete from './Autocomplete';
import ResultCells from './ResultCells';


export default class Recommendations extends React.Component {

	constructor(props) {
		super(props);
		// this.state = {
		// 	address: '',
		// 	city: '',
		// 	area: '',
		// 	state: '',
		// 	mapPosition: {
		// 		lat: this.props.center.lat,
		// 		lng: this.props.center.lng
		// 	},
		// 	markerPosition: {
		// 		lat: this.props.center.lat,
		// 		lng: this.props.center.lng
		// 	}
		// }
	}

	render() {

		return (
			<div className="Recommendations">
				<PageNavbar active="recommendations" />
				<div className="sidepanel">
					<div className="location-input">
						<h6>start: </h6> <Autocomplete />
						<br/>
						<h6>destination: </h6><Autocomplete />
					</div>
					<ResultCells />
				</div>
				<div className="map">
					<Map />
				</div>
			</div>
		);
	}
}
