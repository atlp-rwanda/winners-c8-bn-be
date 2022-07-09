import express from 'express';
import validateUserData from '../../../middlewares/validators/UserValidator'; 
import UserController from '../../../controllers/User';
import passport from 'passport';
import '../../../database/config/passportSetup'; 
import Social from '../../../controllers/socialAuth'
const router = express.Router();

const session = require('express-session');
router.use(session({ secret: process.env.TOKEN_SECRET, resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());

router.get('/auth/google/callback', passport.authenticate('google'), Social.Oauth);
router.get('/oauth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/oauth/facebook/', passport.authenticate('facebook', {scope: ['public_profile', 'email']}));
router.get('/facebook/callback', passport.authenticate('facebook'), Social.Oauth);
 
export default router;
