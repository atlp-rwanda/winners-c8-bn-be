import express from 'express';
import validateUserData from '../../../middlewares/validators/UserValidator'; 
import UserController from '../../../controllers/User';
import passport from 'passport';
import '../../../database/config/passportSetup'; 
import Social from '../../../controllers/socialAuth';
import errorResponse from "../../../utils/error";
import successResponse from "../../../utils/success";
const router = express.Router();

const session = require('express-session');
router.use(session({ secret: process.env.TOKEN_SECRET, resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/auth/google/failure' }), Social.Oauth);
router.get('/oauth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/oauth/facebook/', passport.authenticate('facebook', {scope: ['public_profile', 'email']}));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/auth/facebook/failure' }), Social.Oauth);

router.get('/auth/google/failure', (req, res) => {
    errorResponse(res, 401, "failed to authenticate through google");
  });

router.get('/auth/facebook/failure', (req, res) => {
    errorResponse(res, 401, "failed to authenticate through facebook");
});

router.get('auth/google/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    successResponse(res, 200, "Signed out from google auth", result);
});

router.get('auth/facebook/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    successResponse(res, 200, "Signed out from facebook auth", result);
});
 
export default router;
