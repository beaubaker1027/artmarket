const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// set storage location and filename for multer
const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.join(__dirname,'../uploads/user'))
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })

// declare an instance of multer using storage: storage - diskStorage
// alternatively you could just list the destination here as well.
// Ex. dest: path.join(__dirname,'../uploads/user/')
// It does the same thing but doesnt allow filename customization;
const upload = multer({ storage: storage });

// user model
const User = require('../models/userModel');

// config file
const config = require('../private/config');

// register user
router.post('/register', upload.single('profilePic'), (req, res, next) => {
  const profilePic = req.file;
  const { username, name, email, password, gender, accountType} = JSON.parse(req.body.user);

  // instance user
  var newUser = new User({
    name: name,
    email: email,
    username: username,
    gender: gender,
    accountType: accountType,
    password: password
  })


  if(profilePic){
    // function for file encoding
    User.base64_encode(profilePic.path)
      .then((base64)=>{
        console.log(profilePic);
        newUser['profilePic'] = {
          name: profilePic.originalname,
          size: profilePic.size,
          mimetype: profilePic.mimetype,
          base64: base64,
        }
      })
      .then(()=>{
        User.addUser(newUser, (err, user) => {
          if(err){
            return res.json({success: false, msg:'Failed to register user: '+err});
          } else {
            return res.json({success: true, msg:'User registered'});
          }
        })
      })
      .catch((err) =>{
        console.log(err);
        return res.json(err);
      });
    } else {
      User.addUser(newUser, (err, user) => {
        if(err){
          return res.json({success: false, msg:'Failed to register user: '+err});
        } else {
          return res.json({success: true, msg:'User registered but your profile picture failed to upload'});
        }
      })
    }
});

// authenticate user
router.post('/authenticate', (req, res, next) => {
  const {email, password} = req.body;

  User.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: "User not found"});
    }

    user = {
      password: user.password,
      username: user.username,
      email: user.email,
      name: user.name,
    }


    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, config.session.secret, {
          expiresIn: config.session.expiration
        });

        res.json({
          success: true,
          token: token,
          user: {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong Password'});
      }
    })
  })
});

// edit user info
router.post('/edit', passport.authenticate('jwt', {session:false}), upload.single('profilePic'), (req, res, next) => {
  const profilePic = req.file;
  const { currentUsername, newUsername, name, email, password, gender, accountType} = JSON.parse(req.body.user);

  var editUser = {
    name: name,
    email: email,
    password: password,
    gender: gender,
    accountType: accountType,
  }

  if(profilePic){
    User.base64_encode(profilePic.path)
      .then((base64)=>{
        console.log(profilePic);
        editUser['profilePic'] = {
          name: profilePic.originalname,
          size: profilePic.size,
          mimetype: profilePic.mimetype,
          base64: base64,
        }
      })
      .then(()=>{
        editUser['username'] = newUsername;
        User.updateUser(editUser, currentUsername, (err, user) => {
          if(err){
            return res.json({success: false, msg:'Failed to Update User'});
          } else {
            return res.json({
              success: true,
              msg:'User Updated',
              user: {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email
              }
            });
          }
        })
      })
      .catch((err) =>{
        console.log(err);
        return res.json(err);
      });
  } else{
    editUser['username'] = newUsername;
    User.updateUser(editUser, currentUsername, (err, user) => {
      if(err){
        return res.json({success: false, msg:'Failed to Update User'});
      } else {
        return res.json({
          success: true,
          msg:'User Updated',
          user: {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email
          }});
      }
    })
  }
});

// upload artwork
router.post('/artwork', passport.authenticate('jwt', {session:false}), upload.single('upload'), (req, res, next) => {
  const upload = req.file;
  const{username, description, price} = JSON.parse(req.body.artwork);

  var newArtwork = {
    description: description,
    price: price,
  }

  if(upload){
    // function for file encoding
    User.base64_encode(upload.path)
      .then((base64)=>{
        newArtwork['upload'] = {
          name: upload.originalname,
          size: upload.size,
          mimetype: upload.mimetype,
          base64: base64,
        }
      })
      .then(()=>{
        User.pushArtwork(username, newArtwork, (err, user) => {
          if(err){
            return res.json({success: false, msg:'Failed to Upload Artwork: '+err});
          } else {
            return res.json({success: true, msg:'Artwork Uploaded Successfully'});
          }
        })
      })
      .catch((err) =>{
        return res.json(err);
      });
    } else {
        return res.json({success: false, msg:'Photo not attached properly'});
    }

})

module.exports = router;
