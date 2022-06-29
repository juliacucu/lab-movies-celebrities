const router = require('express').Router()
const { populate } = require('../models/Celebrity.model');
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');
const MovieModel = require('../models/Movie.model');

  //Iteration #6:Add a new movie
  router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
      .then((allCelebrities) => {
          res.render("movies/new-movie.hbs", {allCelebrities});
      })
      .catch((error) => next(error));
});

    router.post("/movies/create", (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
        MovieModel.create({ title, genre, plot, cast })
            .then((createdMovie) => res.redirect("/movies"))
            .catch((error) => next(error));
  })

//Iteration #7: Listing our movies
router.get("/movies", (req, res, next) => {
    MovieModel.find()
      .then((allTheMoviesFromDB) => {
        console.log("Retrieved movies from DB:", allTheMoviesFromDB);
        res.render("movies/movies.hbs", {
          movie: allTheMoviesFromDB,
        });
      })
      .catch((error) => {
        console.log("Error while getting movies from the DB", error);
      });
  });
  
  //Iteration #8: Movie details
  router.get('/movies/:id', (req, res, next) =>{
      MovieModel.findById(req.params.id)
      .populate('cast')
      .then((response) =>{
          console.log(response)
          res.render('movies/movie-details.hbs', {response})
      })
      .catch((error) => next(error));
  })

  // Iteration #9: Delete the movie
    router.post('/movie/:id/delete', (req, res, next) => {
        const { id } = req.params;
        MovieModel.findByIdAndDelete(id)
         .then(() => res.redirect('/movies'))
         .catch(error => next(error));
  });
  

module.exports = router