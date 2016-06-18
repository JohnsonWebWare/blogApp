var debugLog = global.util.debuglog('facebookAuth');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('./models/user');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy(
  global.config.facebookAuth,
  function (token, refreshToken, profile, done) {

    process.nextTick(function () {
      User.findOne({ 'facebookId': profile.id }, function (err, user) {
        if (err)
          return done(err);

        if (user){
          if(user._profileVersion < global.config.profileVersion) {

            console.info('Updating user data for ' + user._id);

            user._profileVersion = global.config.profileVersion;
            user.facebookId = profile.id;
            user.facebookToken = token;
            user.firstName = profile.name.givenName;
            user.lastName = profile.name.familyName;
            user.email = (profile.emails[0].value || '').toLowerCase();
            user.gender = profile.gender;
            user.picture = profile.photos[0].value || '';
            user.link = profile.link

            user.save(function (err) {
              if (err)
                throw err;
              return done(null, user);
            });
          }

          return done(null, user);

        } else {

          var newUser = new User();

          newUser._profileVersion = global.config.profileVersion;
          newUser.facebookId = profile.id;
          newUser.facebookToken = token;
          newUser.firstName = profile.name.givenName;
          newUser.lastName = profile.name.familyName;
          newUser.email = (profile.emails[0].value || '').toLowerCase();
          newUser.gender = profile.gender;
          newUser.picture = profile.photos[0].value || '';
          newUser.link = profile.link;

          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  })
);


module.exports = function (app) {
  app.use(passport.initialize())
     .use(passport.session())
     .get('/auth',
        passport.authenticate('facebook', { scope: 'email' }),
          function (req, res) {
            console.error('How did I get to /auth');
     })
     .get('/auth/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
          function (req, res) {
            res.redirect('/');
     });
}