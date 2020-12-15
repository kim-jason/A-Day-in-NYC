import React from 'react';
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from 'react-places-autocomplete';
const google = window.google;

export default class LocationSearchInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = { address: '' };
	}

  clearField() {
    this.setState({address: ''});
  }

  handleChange = address => {
    this.setState({ address });
  };

	handleSelect = address => {
		this.setState({
			address: address,
		});
		geocodeByAddress(address)
			.then(results => getLatLng(results[0]))
			.then(latLng => this.props.addressSelected(latLng))
			.catch(error => console.error('Error', error));
		console.log(address);
	};

	searchOptions = {
		location: new google.maps.LatLng(41, -74),
		radius: 40000,
		componentRestrictions: {country: 'us'}
	}

	render() {
		return (
			<div className="autocomplete">

				<PlacesAutocomplete
					value={this.state.address}
					searchOptions={this.searchOptions}
					onChange={this.handleChange}
					onSelect={this.handleSelect}
				>
					{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
						<div className="searchBox">
							<input
								{...getInputProps({
									placeholder: 'Search Places ...',
									className: 'location-search-input',
								})}
							/>
							<div className="autocomplete-dropdown-container">
								{loading && <div>Loading...</div>}
								{suggestions.map(suggestion => {
									const className = suggestion.active
										? 'suggestion-item--active'
										: 'suggestion-item';
									// inline style for demonstration purpose
									const style = suggestion.active
										? { backgroundColor: '#fafafa', cursor: 'pointer' }
										: { backgroundColor: '#ffffff', cursor: 'pointer' };
									return (
										<div
											{...getSuggestionItemProps(suggestion, {
												className,
												style,
											})}
										>
											<span>{suggestion.description}</span>
										</div>
									);
								})}
							</div>
						</div>
					)}
				</PlacesAutocomplete>
			</div>
		);
	}
}