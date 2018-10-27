const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

mongoose.set('useCreateIndex', true);

// we create a user schemas
let userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: false
  },
  accountType: {
    type: String,
    required: true
  },
  passResetKey: String,
  passKeyExpires: Number,
  createdAt: {
    type: Date,
    required: false
  },
  updatedAt: {
    type: Number,
    required: false
  },
  artwork: {
    type: Array,
    required: false
  },
  cart: {
    type: Object,
    required: false
  },
  profilePic: {
    type: Object,
    require: false
  }
}, {runSettersOnQuery: true});
/* 'runSettersOnQuery' is used to implement the specifications
in our model schema such as the 'trim' option*/

userSchema.pre('save', function(next) {
  console.log(this);
  this.email = this.email.toLowerCase() //ensures emails are in lowercase

  var currentDate = new Date().getTime();
  this.updatedAt = currentDate;
  if(!this.created_at) {
    this.createdAt = currentDate;
  }
  next()
})

var user = mongoose.model('user', userSchema);

module.exports = user;

module.exports.getUserById = function(id, callback){
  user.findById(id, callback);
};

module.exports.getUserByEmail = function(email, callback){
  const query = {email:email};
  user.findOne(query, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username};
  user.findOne(query, callback);
}

module.exports.pushArtwork = function(username, artwork, callback){
  const query = {username: username};
  user.findOneAndUpdate(query, { $push: { artWork: artwork }}, callback)
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    })
  })
};

module.exports.updateUser = function(editUser, currentUsername, callback){
  for(let prop in editUser){
    console.log(prop);
    if(editUser[prop]){
      console.log(prop)
      console.log(currentUsername);
      let query = { username: currentUsername };
      let updateQuery = {}
      updateQuery[prop] = editUser[prop];
      user.findOneAndUpdate(query, updateQuery, callback);
    }
  }
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  })
}

module.exports.base64_encode = function(file){
  return new Promise((resolve, reject) =>{
    if(file == undefined){
      reject({
        success: false,
        msg: 'No File Found'
      })
    } else {
      let data = fs.readFileSync(file, 'base64');
      fs.unlink(file);
      resolve(data.toString('base64'));
    }
  })
}

module.exports.base64_decode = function(file, username){
  return new Promise((resolve, reject) => {
    if(!file){
      console.log('err undefined');
      reject({
        success: false,
        msg: 'no file exists'
      })
    } else {
      if(!file.name){
        file.name = username+'-temp.'+file.mimetype.split('/')[1];
      } else {
        file.name = username+'-'+file.name;
      }
      fs.writeFile('./uploads/user/'+file.name, file.base64, {encoding: 'base64'}, (err)=>{
        if(err){
          reject({
            success: false,
            msg: 'file wasnt decoded'
          })
        } else{
          let writtenFile = {
            filepath: path.join(__dirname,'../uploads/user/'+file.name),
            mimetype: file.mimetype,
          }

          console.log(writtenFile);
          resolve(writtenFile);
        }
      });
    }
  })
}

module.exports.loopProfiles = function(profiles){
  var profiles = profiles
  console.log('loop: ', profiles)
  var profileArray = [];
  return new Promise((resolve, reject) =>{
    if(profiles.length == 0){
      reject({
                success: false,
                msg: "No users with that name!"
              })
    } else {
      for ( let profile in profiles){
        console.log('profile: ',profiles[profile]);
        const { username, name } = profiles[profile];
        console.log('username: '+username+' name: '+ name);
        let profileDetails = {
          username: username,
          name: name
        }
        console.log(profileDetails);
        console.log('profileArray1: ', profileArray);
        profileArray.push(profileDetails);
      }
    }
    console.log('profileArray: ', profileArray);
    resolve(profileArray);
  })
}

module.exports.findRandom = function(profiles, int){

  let randomProfiles = [];

  let selectRandom = () => {
    for(i=0; i<int; i++){
      if(profiles.length === 0){ continue }
      let chosen = Math.floor(Math.random() * Math.floor(profiles.length));
      let { username, artWork } = profiles[chosen];
      let user = {
        username: username,
        artwork: artWork[artWork.length - 1],
      }
      randomProfiles.push(user);
      profiles.splice(chosen, 1);
    }
  }

  return new Promise((resolve, reject) => {
    if(profiles.length == 0){
      reject({
        success: false,
        msg: 'No profiles are created'
      })
    } else{
      selectRandom();
      console.log('randomProfiles: ',randomProfiles);
      resolve({
        success: true,
        msg: "returned "+int+" profiles",
        users: randomProfiles
      })
    }
  })
}
