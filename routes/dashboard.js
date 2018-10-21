const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const config = require('../private/config');

router.get('/randomArtists', (req, res, next) => {
  const randomArtists = [];

  User.find({accountType: 'Seller'}, (err, profiles)=>{
    if(err){
      res.json({
        success: false,
        msg: err,
      });
    }
    User.findRandom(profiles, 3)
      .then((success) => {
        return res.json(success);
      })
      .catch((err) => {
        return res.json(err);
      })
  })
});

module.exports = router;
