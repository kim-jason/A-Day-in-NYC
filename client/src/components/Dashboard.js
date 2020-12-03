import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import GenreButton from './GenreButton';
import DashboardMovieRow from './DashboardMovieRow';
import Autocomplete from './Autocomplete';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      locationName: "",
      distance: 0.5,
      locations: [],
      interests: [],
      favorites: []
    }

    this.handleLocationNameChange = this.handleLocationNameChange.bind(this);
    this.submitLocation = this.submitLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitPOIS = this.submitPOIS.bind(this);
    
  }

  handleLocationNameChange(e) {
    this.setState({
      locationName: e.target.value
    });
  }

  handleLocationClick(location) {
    console.log(location);
  }

  submitLocation() {
    const params = new URLSearchParams({
      street: this.state.locationName,
      city: 'Manhattan',
      county: 'New York',
      state: 'New York',
      country: 'United States of America',
      format: 'json'
    })
  

    fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(locationList => {
      if (!locationList) return;
      let addresses = locationList.map((locationObj, i) => 
      <>
        <DashboardMovieRow name={locationObj.display_name} lat={locationObj.lat} lon={locationObj.lon} dist={this.state.distance}/>
        <button type="button" class="btn btn-info" onClick={() => this.submitPOIS(locationObj.lat, locationObj.lon, this.state.distance)}>Select</button>
      </>
        );
      locationList.map((location, i) => {
        console.log(location);
      } )
      this.setState({
        locations: addresses
      })
    })
    .catch(err => console.log(err))
  }

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
    console.log(event.target.value);
    this.setState({
      distance: event.target.value
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
      <DashboardMovieRow name={poiObj.POI_name}/>
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

  render() {  
    console.log(this.props);
    return (
      <div className="Dashboard">

        <PageNavbar active="dashboard" />

        <br></br>
        <div className="container movies-container">
          <div className="jumbotron">
          <div className="h5">Trip Planner</div>
           <div className="location-input" style={{flexDirection: "row"}}>
             <Autocomplete />
             {/* <input type="text" placeholder="Enter a location" value={this.state.locationName} 
             onChange={this.handleLocationNameChange} id="location-input" className="location-input"/>
             <span class="horizontalgap" style={{width: '10px', marginLeft: '20px' }}>
             <button type="button" class="btn btn-primary" onClick={this.submitLocation}>Search</button>
             </span> */}
           </div>
           <div class="d-flex justify-content-center my-4">
            </div>
            <div class="slidecontainer">
                <input type="range" min="0.1" max="1" value={this.state.distance} step="0.1" class="slider" id="myRange" onChange={this.handleChange} />
                <p>Distance: {this.state.distance} <span id="demo"></span></p>
              </div>
              <div className="jumbotron">
              <div className="movies-container">
                <div className="movies-header">
                  <div className="header-lg"><strong>{ this.state.locations.length == 0 ? ""  : "Name"}</strong></div>
                </div>
                <div className="results-container" id="results">
                  {this.state.locations}
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
        </div>
      </div>
    );
  }
}