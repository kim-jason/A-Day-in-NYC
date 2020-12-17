import React from 'react';
import '../style/Plan.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import ResultCells from './ResultCells';

const mapStyles = {
	width: '100%',
	height: '100%'
};


class MapContainer extends React.Component {
	constructor(props) {
		super(props);

		//google maps api key: AIzaSyApINK6lyjup-OdNACkI2OpUhQWGeJ1n-I

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			movieName: "",
			recMovies: []
		}

	}

	render() {

		return (
			<div className="map2">
				<Map
					google={this.props.google}
					zoom={13}
					style={mapStyles}
					initialCenter={{ lat: 40.7613442, lng: -73.968878 }}
				>
				{this.props.start!==undefined && 
					<Marker
						position={{
							lat: this.props.start.lat,
							lng: this.props.start.lng
						}}
					/>
				}
				{this.props.end!==undefined && 
					<Marker
						position={{
							lat: this.props.end.lat,
							lng: this.props.end.lng
						}}
					/>
				}
				</Map>
			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyApINK6lyjup-OdNACkI2OpUhQWGeJ1n-I'
})(MapContainer);