const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const config = require('../private/config');


router.get('/find', (req, res, next) => {

  const { username } = req.query;


  User.findOne({username: username}, (err, profile) => {
    if(err || !profile){
      res.json({success: false, msg:'User Not Found!'});
    } else {
      let user = {
        username: profile.username,
        name: profile.name || undefined,
        email: profile.email,
        phone: profile.phone || undefined,
        gender: profile.gender || undefined,
        followers: profile.followers || undefined,
        artwork: profile.artWork || []
      }
      res.json({success: true, msg:'User registered', user} );
    }
  })
});

router.get('/find/image', (req, res, next) => {
  console.log(req.query)
  const { username } = req.query;

  User.findOne({username: username}, (err, profile) => {
    if(err || !profile){
      res.json({success: false, msg:'User Not Found!'});
    } else {
      const profilePic = profile.profilePic;

      User.base64_decode(profilePic, username)
        .then((file)=>{
          console.log('file: ',file);
          res.set('Content-Type', file.mimetype);
          res.sendFile(file.filepath, (err)=>{
            if(err){
              console.log('Error: ',err);
            } else{
              console.log('Sent: ',file);
            }

          });
          res.on('finish', ()=>{
            try{
              fs.unlink(file.filepath, (err)=>{
                if(err){
                  return console.log('Error: ',err);
                } else{
                  return console.log('File Removal Success');
                }
              });
            } catch(err){
              return console.log('error removing file at path: ('+file+') from directory: ',err);
            }
          })
        })
        .catch((err)=>{
          console.log(err);
          let defaultPath = path.join(__dirname,'../uploads/default/question-mark.jpg');
          res.set('Content-Type', 'image/jpg');
          res.sendFile(defaultPath, (err)=>{
            if(err){
              return console.log('Error: ',err);
            } else{
              return console.log('Sent: ', defaultPath);
            }

          });
        })
    }
  })
})

router.get('/findall', (req, res, next) => {
  const { searchTerm } = req.query;
  console.log('searchTerm: ',searchTerm.toString());

  User.find({ 'username': { "$regex": '^'+searchTerm.toString(), "$options": "i" } }, (err, profiles) => {
    console.log('profiles: ',profiles);
    if(err) throw err;
    User.loopProfiles(profiles)
      .then((profileArray)=>{
        console.log(profileArray);
          return res.json({
                    success: true,
                    msg: 'Users found',
                    users: profileArray
                  });
      })
      .catch((err) => {
            return res.json(err);
      });
  })
});

module.exports = router;
