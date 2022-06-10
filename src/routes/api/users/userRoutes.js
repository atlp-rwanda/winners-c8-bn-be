/*eslint-disable */
import express from 'express';
import validateUserData from '../../../middlewares/validators/UserValidator'; 
import UserController from '../../../controllers/User';
import passport from '../../../database/config/passportSetup'; 
import { UserAuthentication } from '../../../middlewares/auth';
import Social from '../../../controllers/socialAuth';
const router = express.Router();

router.post('/signup', validateUserData.createUser, validateUserData.verifyIfEmailisAvailable ,UserController.signUp);
router.post('/signin', validateUserData.validateUserSigninData, validateUserData.verifySignin, UserController.signIn);
router.get('/verifyEmail/:token', validateUserData.verificationValidation ,UserController.accountVerification);
router.get('/auth/google/callback', passport.authenticate('google'), Social.Oauth);
router.get('/oauth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/oauth/facebook/', passport.authenticate('facebook', {scope: ['public_profile', 'email']}));
router.get('/facebook/callback', passport.authenticate('facebook'), Social.Oauth);
router.post('/forgotPassword', validateUserData.verifyEmail, UserController.forgetPassword);
router.put('/resetpassword/:newToken', validateUserData.validateResetPasswordData, UserController.resetPassword);
 
export default router;