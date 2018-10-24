const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const config = require('../private/config');

//find 3 random artists
router.get('/randomArtists/:int', (req, res, next) => {
  const randomArtists = [];

  console.log(req.params)

  const { int } = req.params;

  User.find({accountType: 'Seller'}, (err, profiles)=>{
    if(err){
      res.json({
        success: false,
        msg: err,
      });
    }
    User.findRandom(profiles, int)
      .then((success) => {
        return res.json(success);
      })
      .catch((err) => {
        return res.json(err);
      })
  })
});

module.exports = router;
