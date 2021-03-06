import UserService from "../services/user";
import errorResponse from "../utils/error";
import successResponse from "../utils/success";
import sendResetEmail from "../helpers/sendResetEmail";
import Protection from "../middlewares/hash";
import 'dotenv/config';


const { hashPassword, checkPassword, signToken, verifyToken } = Protection;



const { checkUser, verifyUserAccount,checkUserById } = UserService;

class Reset{
    static async requestResetPassword ( req, res){
        try {
            const {email} = req.body;
            const redirectUrl = process.env.REDIRECT_URL;
            //Check if the user(email) exist 
            const user = await checkUser(email);
            if(!user){
                return errorResponse(res, 409, "Ooops! User does't exists!");
            }
             //check if the user is verified
            if (!user.isVerified) {
                return errorResponse(res, 403, `This account is not verified!`);
              }

              const token = await signToken({userId: user.id})
              //procceding with email to reset password
              sendResetEmail(user, redirectUrl, res, token);
    
              return successResponse(res, 201, "Email set link sent successfully");
    
    
        } catch (error) {
            return errorResponse(
                res,
                500,
                `Ooops! Unable reset password ${error.message}`
              );
        }
    }
    
    
    static async resetPassword(req, res){
        let newPassword = req.body.newPassword;
        let confirmPassword = req.body.confirmPassword;
        // const password = (newPassword == confirmPassword);
        if(newPassword == confirmPassword){
            try {
                let token = req.params.token;
                const {userId} = await verifyToken(token)
        
                //Check if the user with given id  exist 
                const user = await checkUserById(userId);
                if(user){
                   try {
                    if(newPassword == confirmPassword){
                         //hash the new password
                    const hashedPassword= hashPassword(newPassword);
                    //Update the user password
                    user.update({password: hashedPassword});
                    return successResponse(res, 201, "Password updated successfully");
                    }
        
                   } catch (error) {
                    return errorResponse(
                        res,
                        500,
                        `Ooops! Updating user password failed ${error.message}`
                      );
                   }
        
                }else{
                    return errorResponse(
                        res,
                        500,
                        `Ooops! You can't update the user who doesn't exist ${error.message}`
                      );
                }
        
            } catch (error) {
                return errorResponse(
                    res,
                    500,
                    `Ooops! Checking for password reset failed ${error.message}`
                  );
            }

        }else{
            return errorResponse(
                res,
                500,
                `Ooops! Entered passwords doesn't match`
              );
        }
        
    }
}

export default Reset;