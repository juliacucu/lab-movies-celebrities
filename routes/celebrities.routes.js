//const express = require('express');
const router = require("express").Router();

const CelebrityModel = require("../models/Celebrity.model");

router.get("/celebrities", (req, res, next) => {
  CelebrityModel.find()
    .then((allTheCelebritiesFromDB) => {
      console.log("Retrieved celebrities from DB:", allTheCelebritiesFromDB);
      res.render("celebrities/celebrities.hbs", {
        celebrity: allTheCelebritiesFromDB,
      });
    })
    .catch((error) => {
      console.log("Error while getting celebrities from the DB", error);
    });
});

// Add a new celebrity
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  CelebrityModel.create({ name, occupation, catchPhrase })
    .then((createdCelebrity) => res.redirect("/celebrities"))
    .catch((error) => next(error));
});

module.exports = router;
