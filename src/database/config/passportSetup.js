/* eslint-disable */
import GoogleStrategy from 'passport-google-oauth2';
import passport from 'passport';
// import GoogleStrategy from 'passport-google-oauth2';
import FacebookStrategy from 'passport-facebook';
import 'dotenv/config';
import userService from '../../services/userService';

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(async (user, done) => {
  done(null, user);
});
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
  callbackURL: process.env.SERVER_ADDRESS+'/api/oauth/google/callback',
  passReqToCallback: true,
},
(request ,accessToken, refreshToken, profile, done) => {
  done(null, profile);
},)); 
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_AUTH_APP_ID,
  clientSecret: process.env.FACEBOOK_AUTH_APP_SECRET,
  callbackURL: process.env.SERVER_ADDRESS+'/api/oauth/facebook/callback',
  profileFields: ['photos', 'email', 'name']
},
((accessToken, refreshToken, profile, done) => {
  done(null, profile);
})));
export default passport;
