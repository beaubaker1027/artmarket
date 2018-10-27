//dependencies
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
//const session = require('express-session');
const cors = require('cors');
const passport = require('passport');


//modules
const config = require('./private/config');
const register = require('./routes/register');
const profile = require('./routes/profile');
const dashboard = require('./routes/dashboard');


//connect to database(mlab)
mongoose.connect(config.mLab.path, {useNewUrlParser: true })
.then(() => {
  return console.log('connected to database\n')
})
.catch((err) => {
  return console.log('couldn\'t connect to database\nError: '+err)
});

//init express()
const app = express();

// Cors middleware
app.use(cors());

//set static Folder
app.use(express.static(path.join(__dirname, 'client')));

// body-parser middleware
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./private/passport')(passport);


//routes
app.use('/user', register);
app.use('/profile', profile);
app.use('/dashboard', dashboard);

//listener
app.listen(config.port, () => console.log(`ArtMarket listening on port ${config.port}\n`))
