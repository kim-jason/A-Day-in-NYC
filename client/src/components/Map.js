import React from 'react';
import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import { Map, GoogleApiWrapper } from 'google-maps-react';
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
        			initialCenter={{lat: 40.7713442,lng: -73.948878}}
      			/>
		    </div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyApINK6lyjup-OdNACkI2OpUhQWGeJ1n-I'
  })(MapContainer);