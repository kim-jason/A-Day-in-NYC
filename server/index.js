const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */




// The route localhost:8081/genres is registered to the function
app.get('/zones/:lat/:lon', routes.getTaxiZone);


app.get('/pois/:lat/:lon/:distance', routes.getPOIS);

app.get('/stations/:lat/:lon/:distance', routes.getStations);

app.get('/zones', routes.getAllZones);

app.get('/pois/:zone', routes.getNumPOIS);

app.get('/lyftPrice/:start_lat/:start_lng/:end_lat/:end_lng', routes.getLyftPrice);

app.get('/taxiPrice/:start_lat/:start_lng/:end_lat/:end_lng/:hour', routes.getTaxiPrice);

app.get('/subwayStops/:start_lat/:start_lng/:end_lat/:end_lng', routes.getSubwayStops);

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});