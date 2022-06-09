import { User } from '../database/models';
import errorResponse from '../utils/error';
import successResponse from '../utils/success';
exports.updateUserProfile=async (req,res)=>{
const user=req.user.dataValues
// console.log(req.user)
        try {
            
            const {firstName,lastName,email,username,phoneNumber,image,gender,preferredLanguage,preferredCurrency,department,lineManager} = req.body;
            if(!firstName || !lastName || !username || !email || !phoneNumber || !image || !gender || !preferredLanguage || !preferredCurrency || !department || !lineManager){
               return errorResponse(res,400,"Please fill empty fields!")
            }
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
