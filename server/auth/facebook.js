var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var config = require('../config');
// var init = require('./init');

passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: ['id', 'emails', 'name'] 
  },
  function(accessToken, refreshToken, profile, done) {

    var searchQuery = {
      name: profile.displayName
    };

    var updates = {
      name: profile.displayName,
      someID: profile.id
    };

    var options = {
      upsert: true
    };

    // update the user if s/he exists or add a new user
    // User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
    //   if(err) {
    //     return done(err);
    //   } else {
    //     return done(null, user);
    //   }
    // });
    return done(null, {profile});
  }
));

// serialize user into the session
// init();


module.exports = passport;