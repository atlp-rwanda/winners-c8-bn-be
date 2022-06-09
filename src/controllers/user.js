import { User } from '../database/models';
import errorResponse from '../utils/error';
import successResponse from '../utils/success';
exports.updateUserProfile=async (req,res)=>{

        try {
            
            const {userId}=req.params
            const user=await User.findOne({where:{id:userId}})
            if(!user)
            {
                return errorResponse(res, 404, `Ooops! User doesn't exists!`);
            }
            const {firstName,lastName,email,username,phoneNumber,image,gender,preferredLanguage,preferredCurrency,department,lineManager} = req.body;
const updatedUser=  await User.update({
    firstName,lastName,email,username,phoneNumber,image,gender,preferredLanguage,preferredCurrency,department,lineManager
},{
    where:{id:user.id}
})
if(updatedUser)
res.status(200).json({message:"user Profile updated well done"})
        } catch (error) {
            return errorResponse(res,500,error.message)
        }
    
}