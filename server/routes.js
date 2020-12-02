var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

function getTaxiZone(req, res) {
  console.log(req.params);
  var query =  `
  WITH distances AS
  (SELECT zone_name, borough, (3959 * ATAN2(SQRT(POWER(COS(RADIANS(${req.params.lat}))*SIN(RADIANS(${req.params.lon}-centroid_lng)),2) + POWER(COS(RADIANS(centroid_lat))*SIN(RADIANS(${req.params.lat})) - (SIN(RADIANS(centroid_lat))*COS(RADIANS(${req.params.lat})) * COS(RADIANS(${req.params.lon}-centroid_lng))), 2)), SIN(RADIANS(centroid_lat))*SIN(RADIANS(${req.params.lat})) + COS(RADIANS(centroid_lat))*COS(RADIANS(${req.params.lat}))*COS(RADIANS(${req.params.lon}-centroid_lng)))) AS distance
  FROM TaxiLookup T)
  SELECT zone_name, borough
  FROM distances
  WHERE distance = (SELECT min(distance) FROM distances)
  LIMIT 1;
`;
connection.query(query, function(err, rows, fields) {
  if (err) {
    console.log(err);
  } else {
    res.json(rows);
  }
});
};

function getPOIS(req, res) {
  console.log("HERE");
  console.log(req.params);
  var query = 
  `WITH distances AS
  (SELECT POI_name, (3959 * ATAN2(SQRT(POWER(COS(RADIANS(${req.params.lat}))*SIN(RADIANS(${req.params.lon}-lng)),2) + POWER(COS(RADIANS(lat))*SIN(RADIANS(${req.params.lat})) - (SIN(RADIANS(lat))*COS(RADIANS(${req.params.lat})) * COS(RADIANS(${req.params.lon}-lng))), 2)), SIN(RADIANS(lat))*SIN(RADIANS(${req.params.lat})) + COS(RADIANS(lat))*COS(RADIANS(${req.params.lat}))*COS(RADIANS(${req.params.lon}-lng)))) AS distance
  FROM POIs P)
  SELECT POI_name
  FROM distances
  WHERE distance < ${req.params.distance}
  ORDER BY POI_name
  LIMIT 10;
  
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
} 

/* ---- Q1a (Dashboard) ---- */
function getAllGenres(req, res) {
  var query = `
    SELECT DISTINCT genre
    FROM Genres;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
};


/* ---- Q1b (Dashboard) ---- */
function getTopInGenre(req, res) {
  var query = `
    SELECT Movies.title, Movies.rating, Movies.vote_count
    FROM Movies JOIN Genres ON Movies.id = Genres.movie_id
    WHERE Genres.genre = '${req.params.genre}'
    ORDER BY Movies.rating DESC, Movies.vote_count DESC
    LIMIT 10;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
};

/* ---- Q2 (Recommendations) ---- */
function getRecs(req, res) {
  var query = `
    WITH target_genres AS (
      SELECT Genres.genre
      FROM Movies JOIN Genres ON Movies.id = Genres.movie_id
      WHERE Movies.title = '${req.params.title}'
    )
    SELECT Movies.title, Movies.id, Movies.rating, Movies.vote_count 
    FROM Movies JOIN Genres ON Movies.id = Genres.movie_id
    WHERE Genres.genre IN (SELECT genre FROM target_genres) AND Movies.title != '${req.params.title}'
    GROUP BY Movies.id
    HAVING COUNT(DISTINCT genre) = (SELECT COUNT(genre) FROM target_genres)
    ORDER BY Movies.rating DESC, Movies.vote_count DESC
    LIMIT 5;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
};

/* ---- (Best Genres) ---- */
function getDecades(req, res) {
	var query = `
    SELECT DISTINCT (FLOOR(year/10)*10) AS decade
    FROM (
      SELECT DISTINCT release_year as year
      FROM Movies
      ORDER BY release_year
    ) y
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- Q3 (Best Genres) ---- */
function bestGenresPerDecade(req, res) {
  let endYear = parseInt(req.params.startYear) + 9;
	var query = `
    WITH every_genre AS (
      SELECT DISTINCT genre, 0 as default_val
      FROM Genres
    ), decade_ratings AS (
      SELECT Genres.genre, AVG(Movies.rating) as avg_rating
      FROM Movies JOIN Genres ON Movies.id = Genres.movie_id
      WHERE Movies.release_year >= ${req.params.startYear} AND Movies.release_year <= ${endYear}
      GROUP BY Genres.genre
    )
    SELECT every_genre.genre, COALESCE(avg_rating, default_val) as rating
    FROM every_genre LEFT JOIN decade_ratings ON every_genre.genre = decade_ratings.genre
    ORDER BY avg_rating DESC, every_genre.genre;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// The exported functions, which can be accessed in index.js.
module.exports = {
  getTaxiZone: getTaxiZone,
  getPOIS: getPOIS,
	getAllGenres: getAllGenres,
	getTopInGenre: getTopInGenre,
	getRecs: getRecs,
	getDecades: getDecades,
  bestGenresPerDecade: bestGenresPerDecade
}