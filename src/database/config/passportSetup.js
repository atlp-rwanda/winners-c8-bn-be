/* eslint-disable */

import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import 'dotenv/config';

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(async (user, done) => {
  let foundUser;
  const byGoogle = await userService.findByProp({
    googleId: user.id,
  });
  const byFacebook = await userService.findByProp({
    facebookId: user.id,
  });
  if (byGoogle[0]) {
    foundUser = byGoogle;
  } else {
    foundUser = byFacebook;
  }
  done(null, foundUser);
});
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: '/api/v1/users/auth/google/callback',
},
(accessToken, refreshToken, profile, done) => {
  done(null, profile);
},));
// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_APP_ID,
//   clientSecret: process.env.FACEBOOK_APP_SECRET,
//   callbackURL: '/api/v1/users/facebook/callback',
//   profileFields: ['photos', 'email', 'name']
// },
// ((accessToken, refreshToken, profile, done) => {
//   done(null, profile);
// })));
export default passport;
