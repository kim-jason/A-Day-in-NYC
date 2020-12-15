import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import Autocomp from './Autocomplete';
import POICells from './POICells';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FavoriteCells from './FavoriteCells';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, VerticalBarSeries, VerticalGridLines, LabelSeries} from 'react-vis';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      distance: 0.5,
      zone: "",
      stations: [],
      interests: [],
      favorites: [],
      allZones: [],
      graphData: [],
      taxiZone: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.submitPOIS = this.submitPOIS.bind(this);
    this.addressSelected = this.addressSelected.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.getStations = this.getStations.bind(this);
    this.setZone = this.setZone.bind(this);
    this.getNumPOIS = this.getNumPOIS.bind(this);
    this.removePOI = this.removePOI.bind(this);
    this.searchZone = this.searchZone.bind(this);
  }


  // React function that is called when the page load.
  componentDidMount() {
    fetch(`http://localhost:8081/zones/`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(zoneList => {
      if(!zoneList) return;
      let zList = zoneList.map((zoneObj, i) => 
        zoneObj.zone_name
      )
      this.setState({
        allZones: zList
      })
    })
    .catch(err => console.log(err))
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
      this.setState({
        taxiZone: zoneList[0].zone_name
      })
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

  setZone(event, value) {
    this.setState({
      zone: value
    })
  }

  getZones() {
    fetch(`http://localhost:8081/zones/`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(zoneList => {
      console.log(zoneList)
    })
    .catch(err => console.log(err))
  }

  getNumPOIS() {
    var zParams = encodeURIComponent(this.state.zone);
    fetch(`http://localhost:8081/pois/${zParams}`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(POIList => {
      let zone = this.state.graphData.concat(POIList)
      console.log(zone);
      this.setState({
        graphData: zone
      })
    })
    .catch(err => console.log(err))
  }

  removePOI() {
    var arr = this.state.graphData
    arr.pop();
    this.setState({
      graphData: arr
    })
  }

  addressSelected(latLng) {
    console.log(latLng);
    this.submitPOIS(latLng.lat, latLng.lng, this.state.distance)
    this.getStations(latLng.lat, latLng.lng, this.state.distance)
    this.searchZone(latLng.lat, latLng.lng)
    this.setState( {
      favorites: []
    })
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
             <Autocomp addressSelected={this.addressSelected} />
             {/* <input type="text" placeholder="Enter a location" value={this.state.locationName} 
             onChange={this.handleLocationNameChange} id="location-input" className="location-input"/>
             <span class="horizontalgap" style={{width: '10px', marginLeft: '20px' }}>
             <button type="button" class="btn btn-primary" onClick={this.submitLocation}>Search</button>
             </span> */}
           </div>
           <div class="d-flex justify-content-center my-4">
            </div>
            <div class="middle-row" style={{display: 'flex', flexDirection: 'row'}} >
            <div class="slidecontainer">
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
            <div class="likely-taxi-zone" style={{marginLeft: '20em'}}>
              <h3>{ this.state.interests.length == 0 ? ""  : `Taxi Zone: ${this.state.taxiZone}`}</h3>
            </div>
            </div>
            <div class="slidecontainer">
                <p>Distance: {this.state.distance}</p>
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
            <div class="input">
              <label for="zone"></label>
              <Autocomplete
                id="zones-dropdown"
                options={this.state.allZones}
                getOptionLabel={(option) => option}
                style={{ width: 300 }}
                onChange={this.setZone}
                renderInput={(params) => <TextField {...params} label="All Zones" variant="outlined" />}
              />
              <br></br>
              <button class="btn btn-success" onClick={this.getNumPOIS} >Enter</button>
              &nbsp;
              &nbsp;
              <button class="btn btn-danger" onClick={this.removePOI} >Delete</button>
              <br></br>
              <br></br>
              <br></br>
            </div>
          <XYPlot xType="ordinal" width={750} height={500} xDistance={150}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeries className="vertical-bar-series-example" data={this.state.graphData} />
          </XYPlot>

          </div>
        </div>
      </div>
    );
  }
}