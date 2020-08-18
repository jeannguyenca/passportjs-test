var express = require('express');
var router = express.Router();
var jwt = require("jwt-simple");
var passportFacebook = require('../auth/facebook');

let auth = require("../auth/jwt")();

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/auth/facebook', passportFacebook.authenticate('facebook', { scope: ['email'] } ));

router.get('/auth/facebook/callback',
  passportFacebook.authenticate('facebook', { failureRedirect: '/login', session: false }),
  function (req, res) {
    // Successful authentication

    // Maybe create JWT Token here
    // res.json(req.user);
    const id = req.user.profile.id
    const email = req.user.profile.emails[0].value
    const displayName = `${req.user.profile.name.givenName} ${req.user.profile.name.familyName}`
    // // console.log(req.user)

    if (id) {
      // if (user) {
        var payload = {
          id, 
          email, 
          displayName
        };

        var token = jwt.encode(payload, "test");
        res.json({
          token: token
        });
      // } else {
      //   res.sendStatus(401);
      // }
    } else {
      res.sendStatus(401);
    }

  }
);

router.get('/auth/jwt', auth.authenticate(), (req, res) => {
  res.send("Auth pass")
})


module.exports = router;
