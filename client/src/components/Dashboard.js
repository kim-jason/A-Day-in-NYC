import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import GenreButton from './GenreButton';
import DashboardMovieRow from './DashboardMovieRow';
import Autocomplete from './Autocomplete';
import POICells from './POICells';
import Slider from '@material-ui/core/Slider';
import FavoriteCells from './FavoriteCells';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, VerticalBarSeries, VerticalGridLines, LabelSeries} from 'react-vis';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      distance: 0.5,
      zone: "",
      stations: [],
      interests: [],
      favorites: []
    }

    // this.handleLocationNameChange = this.handleLocationNameChange.bind(this);
    // this.submitLocation = this.submitLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitPOIS = this.submitPOIS.bind(this);
    this.addressSelected = this.addressSelected.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.getStations = this.getStations.bind(this);
  }

  // handleLocationNameChange(e) {
  //   this.setState({
  //     locationName: e.target.value
  //   });
  // }

  // handleLocationClick(location) {
  //   console.log(location);
  // }

  // submitLocation() {
  //   const params = new URLSearchParams({
  //     street: this.state.locationName,
  //     city: 'Manhattan',
  //     county: 'New York',
  //     state: 'New York',
  //     country: 'United States of America',
  //     format: 'json'
  //   })
  

  //   fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
  //     method: 'GET'
  //   })
  //   .then(res => res.json())
  //   .then(locationList => {
  //     if (!locationList) return;
  //     let addresses = locationList.map((locationObj, i) => 
  //     <>
  //       <DashboardMovieRow name={locationObj.display_name} lat={locationObj.lat} lon={locationObj.lon} dist={this.state.distance}/>
  //       <button type="button" class="btn btn-info" onClick={() => this.submitPOIS(locationObj.lat, locationObj.lon, this.state.distance)}>Select</button>
  //     </>
  //       );
  //     locationList.map((location, i) => {
  //       console.log(location);
  //     } )
  //     this.setState({
  //       locations: addresses
  //     })
  //   })
  //   .catch(err => console.log(err))
  // }

  // React function that is called when the page load.
  componentDidMount() {
    // // Send an HTTP request to the server.
    // fetch("http://localhost:8081/genres", {
    //   method: 'GET' // The type of HTTP request.
    // })
    //   .then(res => res.json()) // Convert the response data to a JSON.
    //   .then(genreList => {
    //     if (!genreList) return;
    //     // Map each genreObj in genreList to an HTML element:
    //     // A button which triggers the showMovies function for each genre.
    //     let genreDivs = genreList.map((genreObj, i) =>
    //       <GenreButton id={"button-" + genreObj.genre} onClick={() => this.showMovies(genreObj.genre)} genre={genreObj.genre} />
    //     );

    //     // Set the state of the genres list to the value returned by the HTTP response from the server.
    //     this.setState({
    //       genres: genreDivs
    //     })
    //   })
    //   .catch(err => console.log(err))	// Print the error if there is one.
    // var slider = document.getElementById("myRange");
    // var output = document.getElementById("demo");
    // output.innerHTML = slider.value; // Display the default slider value
    // // Update the current slider value (each time you drag the slider handle)
    // slider.oninput = function() {
    //   output.innerHTML = this.value;
    //   console.log(slider.value);
    // }
  }

  handleChange(event) {
    console.log(event.target.ariaValueText);
    this.setState({
      distance: event.target.ariaValueText
    })
  }

  submitPOIS(lat, lon, distance) {
		console.log("DISTANCE: " + distance)
		fetch(`http://localhost:8081/pois/${lat}/${lon}/${distance}`, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(POIList => {
			if(!POIList) return;
      let pois = POIList.map((poiObj, i) => 
      <POICells name={poiObj.POI_name} addToFavorites={this.addToFavorites}/>
      );
      POIList.map((pobj, i) => {
        console.log(pobj);
      })
      this.setState({
        interests: pois
      });
    })
    .catch(err => console.log(err));
  };

  searchZone(lat, lon) {
    fetch(`http://localhost:8081/zones/${lat}/${lon}`, {
      method: 'GET' // The type of HTTP request.
    })
    .then(res => res.json())
    .then(zoneList => {
      if(!zoneList) return;
      console.log(zoneList);
    })
  }

  getStations(lat, lon, distance) {
    console.log("Got to this point");
    fetch(`http://localhost:8081/stations/${lat}/${lon}/${distance}`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(stationList => {
      if(!stationList) return;
      let sList = stationList.map((stationObj, i) => 
        <FavoriteCells name={stationObj.station_name}/>
      )
      this.setState({
        stations: sList
      })
    })
    .catch(err => console.log(err))
  }
  
  addToFavorites(name, favorite) {
    var joined = [];
    if (favorite) {
      let fobj = <FavoriteCells name={name}/>
      joined = this.state.favorites.concat(fobj);
    } else {
      joined = this.state.favorites.filter(item => item.props.name !== name);
    }
    this.setState( {
      favorites: joined
    })
  } 

  /* ---- Q1b (Dashboard) ---- */
  /* Set this.state.movies to a list of <DashboardMovieRow />'s. */
  showMovies(genre) {
        // Send an HTTP request to the server.
    fetch(`http://localhost:8081/genres/${genre}`, {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(movieList => {
        if (!movieList) return;
        let movieDivs = movieList.map((movieObj, i) =>
          <DashboardMovieRow title={movieObj.title} rating={movieObj.rating} voteCount={movieObj.vote_count}/>
        );
        this.setState({
          movies: movieDivs
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.

  }

  addressSelected(latLng) {
    console.log(latLng);
    this.submitPOIS(latLng.lat, latLng.lng, this.state.distance)
    this.getStations(latLng.lat, latLng.lng, this.state.distance)
  }

  valuetext(value) {
    return `${value}`;
  }

  render() {  
    return (
      <div className="Dashboard">

        <PageNavbar active="dashboard" />

        <br></br>
        <div className="container movies-container">
          <div className="jumbotron">
          <div className="h5">Trip Planner</div>
           <div className="location-input" style={{flexDirection: "row"}}>
             <Autocomplete addressSelected={this.addressSelected} />
             {/* <input type="text" placeholder="Enter a location" value={this.state.locationName} 
             onChange={this.handleLocationNameChange} id="location-input" className="location-input"/>
             <span class="horizontalgap" style={{width: '10px', marginLeft: '20px' }}>
             <button type="button" class="btn btn-primary" onClick={this.submitLocation}>Search</button>
             </span> */}
           </div>
           <div class="d-flex justify-content-center my-4">
            </div>
            <div class="slidecontainer">
                {/* <input type="range" min="0.1" max="1" value={this.state.distance} step="0.1" class="slider" id="myRange" onChange={this.handleChange} /> */}
                {/* <p>Distance: {this.state.distance} <span id="demo"></span></p> */}
                <Slider
                  defaultValue={0.5}
                  getAriaValueText={this.valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={0.1}
                  marks
                  min={0}
                  max={1}
                  style={{width: 300}}
                  onChange={this.handleChange}
                />
            </div>
            <div class="slidecontainer">
                <p>Distance: {this.state.distance} <span id="demo"></span></p>
              </div>
              <div className="jumbotron">
              <div className="movies-container">
                <div className="movies-header">
                  <div className="header-lg"><strong>{ this.state.stations.length == 0 ? ""  : "Stations"}</strong></div>
                </div>
                <div className="results-container" id="results">
                  {this.state.stations}
                </div>
              </div>
              </div>
          </div>
          <br></br>
          <div className="jumbotron">
            <div className="movies-container">
              <div className="movies-header">
                <div className="header-lg"><strong>POIs</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.interests}
              </div>
            </div>
          </div>
          <div className="jumbotron">
            <div className="favorites-container">
              <div className="favorites-header">
                <div className="header-lg"><strong>Favorites</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.favorites}
              </div>
            </div>
          </div>
          <div className="jumbotron">
          <XYPlot xType="ordinal" width={300} height={300} xDistance={100}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeries className="vertical-bar-series-example" data={[
  {x: 'Times Square', y: 10},
  {x: '5th Avenue', y: 5},
  {x: 'Soho', y: 15}
]} />
          <LabelSeries />
        </XYPlot>

          </div>
        </div>
      </div>
    );
  }
}