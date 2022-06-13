import Util from '../helpers/utils';
import userServices from '../services/userService';
import sendEmail from '../services/emailService';
import emailTemplate from '../services/template/sendEmail';
import passwordTemplate from '../services/template/passwordTemplate';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { uploadToCloud } from '../helpers/cloud';
import eventEmitter from '../helpers/notifications/eventEmitter';
import { Listner } from '../helpers/notifications/eventListeners';
import user from '../models/user';

Listner.eventListners();
dotenv.config();

const util = new Util();

class User {
    static signUp = async (req, res) => {
        const {
            email,
            firstName,
            password,
            lastName
        } = req.body;
        const newUser = {
            email,
            password: await bcrypt.hash(password, 10),
            firstName,
            lastName
        };

        const createdUser = await userServices.createuser(newUser);
        const createdUserDetails = createdUser.dataValues;

        const token = jwt.sign({
            id: createdUserDetails.id,
            email: createdUserDetails.email
        }, process.env.PRIVATE_KEY, {
            expiresIn: '7d'
        });
        const subject = 'Verify email for Barefoot Nomad';

        sendEmail(emailTemplate(token, createdUserDetails.firstName), subject, email);
        const message = `Dear ${createdUserDetails.firstName} , A verification email has been sent to you email please go and confirm that email.`;
        const data = {
            id: createdUserDetails.id,
            email: createdUserDetails.email,
            token,
        };
        util.setSuccess(201, message, data);
        return util.send(res);


    }

    static accountVerification = async (req, res) => {
        try {
            const {
                token
            } = req.params;
            const decodeToken = jwt.verify(token, process.env.PRIVATE_KEY);
            await userServices.updateAtt({
                isVerified: true
            }, {
                email: decodeToken.email
            });
            const message = 'Account was succesfully verified';
            util.setSuccess(200, message);
            return util.send(res);
        } catch (error) {
            util.setError(410, error);
            return util.send(res);
        }

    }
    static signIn = async (req, res) => {
        try {
            const userDetails = req.user;
            const {id, firstName, lastName, email,roleId} = userDetails.dataValues;
            const response = {
                id,
                fullName: `${firstName} ${lastName}`,
                email,
                roleId
            }
            const accessToken = jwt.sign(response, process.env.PRIVATE_KEY, { expiresIn: '7d' });
            await userServices.updateAtt({token:accessToken}, { id: response.id});
            const data = {
                token: accessToken,
                userInfo: response,
            }
            util.setSuccess(200, 'You have successfully signed in', data);
            return util.send(res)
        } catch (err) {
            util.setError(500, err.message);
            return util.send(res);
        }
    }
    static async updateProfile(req, res) {
        try {
        console.log(req.file);
         const profileImage = await uploadToCloud(req.file, res);
          const { id } = req.userData;
     
          const userExist = await userServices.findById(id);
          if (userExist) {
            const update = await userServices.updateAtt({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              preferedLanguage: req.body.preferedLanguage,
              profilePicture: profileImage.url,
              officeAddres: req.body.officeAddres,
            }, { id });
          
            util.setSuccess('200', 'user profile updated');
            return util.send(res);
          }
          util.setError(404, 'The user doesn\'t exist');
          return util.send(res);
        } catch (error) {
          util.setError(400, error.message);
          return util.send(res);
        }
      }
      static async getProfile(req, res) {
        try {
          const { id } = req.params;
          const {
            firstName, lastName, email, profilePicture, preferedLanguage, officeAddres,
          } = await userServices.findById(id);
    
          const userdata = {
            firstName, lastName, email, profilePicture, preferedLanguage, officeAddres,
          };
          const message = 'profile details displayed successfully!';
          util.setSuccess(200, message, userdata);
          return util.send(res);
        } catch (error) {
          util.setError(500, 'can\'t retrieve the data');
          return util.send(res);
        }
      }
    
    // forget password


    static forgetPassword = async (req, res) => {
        const {email}=req.body;
        try{
            
            const token = jwt.sign( { email }, process.env.PRIVATE_KEY, { expiresIn: '1d' });
            const subject = 'Reset Password for Barefoot Nomad';
            const url=`${process.env.PASSWORD_RESET_URL}`;
            sendEmail(passwordTemplate(token, url, email), subject, email);
            const message = `Dear ${req.user.dataValues.firstName},A reset Password link has been sent to you email please go and click the link.`;
            const data = {
                id: email,
                token
            };
            util.setSuccess(200, message, data);
            return util.send(res);
        }catch(error){
          util.setError(500,error.message);
          return util.send(res);
    }
  }

  // reset password

  static resetPassword = async(req,res) =>{
      const {email} = req.user;
    try{
        const password = await bcrypt.hash(req.body.password, 10);
        await userServices.updateAtt({password},{email});
        util.setSuccess(200,'Password changed successfully ');
        return util.send(res);
      }catch(error) {
          util.setError(500,error.message);
      }       
  }
  static logOut = async(req, res)=>{
    try{
        const token = String(req.headers['authorization']).split(' ')[1];
        const decodeToken = jwt.verify(token, process.env.PRIVATE_KEY);
        await userServices.updateAtt({token: null},{email: decodeToken.email});
        util.setSuccess(200,'Logged Out succesfully');

        return util.send(res);
    }catch(error){
        util.setError(500, error.message);
        return util.send(res);
    }
}
    static async findById (req,res) {
        
        try {
            const user = await userServices.findById(userId);
            util.setSuccess(200, user)
            util.send (res)
        } catch (error) {
            util.setError(500,error.message)
            util.send(res)
        }
    }
    static changeRole = async (req, res) =>{
        try {
            const { id } = req.params;
            const user = await userServices.findById(id);
            if(user){
                const update = await userServices.updateAtt({
                    roleId: req.body.roleId,
                  }, { id });
      
                  util.setSuccess('200', 'user role successfully changed');
                  return util.send(res);
            }

            util.setError(404, 'user not found');
            util.send(res);
        } catch (error) {
            util.setError(500,error.message)
            util.send(res)
        }
    }
    static deleteUser = async (req,res) =>{
        try {
        const { id } = req.params;
            const user = await userServices.findById(id);
            if(user){
                const update = await userServices.deleteById(id);
      
                  util.setSuccess('200', 'user successfully deleted');
                  return util.send(res);
            }

            util.setError(404, 'user not found');
            util.send(res);
        } catch (error) {
            util.setError(500,error.message)
            util.send(res)
        }
    }
    //assign users to the managers

    static assignUsers = async (req,res)=> {
        try{
            const tokenId = req.userInfo.id;
            const { lineManagerId, id } = req.body;
            const lineManager = await userServices.findBylineManagerId(lineManagerId);
            if (lineManagerId){
                const update = await userServices.updateAtt({lineManager: lineManagerId}, {id});
                eventEmitter.emit('userAssignedToManager', { lineManagerId, id, tokenId});
                util.setSuccess(200, 'user assigned to a manager successful');
                return util.send(res);
            }
        }catch(error){
            util.setError(500,error.message);
            util.send(res)
        }
    }
    //view verified users with their assigned manager
    
    static viewUsersManager= async (req,res)=>{
        
        try{
            const viewUsers= await userServices.getUser();
            if(viewUsers){
                util.setSuccess(200, 'verified users and their managers', viewUsers);
                return util.send(res);
            }
            
        }catch(error){
            util.setError(500,error.message);
            return util.send(res)
        }
    }

}
export default User;