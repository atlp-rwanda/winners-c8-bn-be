import express from 'express';
import passport from 'passport';
import '../../../database/config/passportSetup'; 
import Social from '../../../controllers/socialAuth';
import errorResponse from "../../../utils/error";
// import successResponse from "../../../utils/success";
const router = express.Router();

const session = require('express-session');
router.use(session({ secret: process.env.TOKEN_SECRET, resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/google/failure' }), Social.Oauth);
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/facebook/', passport.authenticate('facebook', {scope: ['public_profile', 'email']}));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/facebook/failure' }), Social.Oauth);

router.get('/google/failure', (req, res) => {
    errorResponse(res, 401, "failed to authenticate through google");
  });

router.get('/facebook/failure', (req, res) => {
    errorResponse(res, 401, "failed to authenticate through facebook");
});
 
export default router;
