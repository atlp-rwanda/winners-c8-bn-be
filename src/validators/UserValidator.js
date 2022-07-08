import SignUpValidationSchema from '../helpers/validateSchemas/SignupValidationSchema';
import SignInValidationSchema from '../helpers/validateSchemas/signInValidationSchema';
import Util from '../helpers/utils';
import userServices from '../services/userService';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
const util = new Util();

class UserValidator {
    static createUser = (req, res, next) => {
        const {
            error
        } = SignUpValidationSchema.validate(req.body);
        if (error) {
            util.setError(400, error);
            return util.send(res);
        }
        next();

    }
    static verifyIfEmailisAvailable = async (req, res, next) => {
        const emailUser = await userServices.findByProp({
            email: req.body.email
        });
        if (emailUser[0]) {
            util.setError(409, 'Email in use');
            return util.send(res);
        }
        next();
    }
    static verificationValidation = async (req, res, next) => {
        try {
            const {
                token
            } = req.params;
            const decodeToken = jwt.verify(token, process.env.PRIVATE_KEY);
            const getUser = await userServices.findByProp({
                email: decodeToken.email
            });

            if (getUser[0].dataValues.isVerified === true) {
                const Error = 'This Account is already verified';
                util.setError(409, Error);
                return util.send(res);
            }
            next();
        } catch (error) {
            const Error = 'The token has expired';
            util.setError(410, Error);
            return util.send(res);
        }
    }
    static validateUserSigninData = async (req, res, next) => {
        const {error} = await SignInValidationSchema.validate(req.body);
        if(error){
            util.setError(400, error);
            return util.send(res);
        }
        return next();
    }
    static verifySignin = async (req, res, next) => {
        try{
            const {email, password} = req.body;
            const getUser = await userServices.findByEmail(req.body.email);
        if(!getUser){
            util.setError(404,'Incorrect email address');
            return util.send(res);
        }
        if(!getUser.dataValues.isVerified) {
            let message = 'You must be verified to login. ';
            message += `To activate your account, click on the verification link sent to your email ${getUser.dataValues.email}`;
            util.setError(403, message);
            return util.send(res);
        }
        const isPasswordCorrect = await bcrypt.compare(password, getUser.dataValues.password);
        if(!isPasswordCorrect) {
            util.setError(403, 'Incorrect password');
            return util.send(res);
        }
        req.user = getUser;
        return next();
        next();
       }catch(error){
            util.setError(400, error.message);
            return util.send(res);
       }
            

            
    }
    static verificationResetValidation = async (req, res, next) => {
        try {
            const {
                token
            } = req.params;
            const decodeToken = jwt.verify(token, process.env.PRIVATE_KEY);
            const getUser = await userServices.findByProp({
                email: decodeToken.email
            });
            next();
        } catch (error) {
            const Error = 'The token has expired';
            util.setError(410, Error);
            return util.send(res);
        }
    }
 
        static verifyEmail = async (req, res, next) => {
            try{
             const {email} = req.body;
             const getUser = await userServices.findByEmail(email);
             if(!getUser){
                 util.setError(404,'Email doesn\'t exist');
                 return util.send(res);
             }
             req.user = getUser;
             return next();
            }catch(error){
                util.setError(500,error.message);
                return util.send(res);
            }
        }

                   

            
}

export default UserValidator;