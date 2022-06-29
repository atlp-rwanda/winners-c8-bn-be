import { User } from '../database/models';
import errorResponse from '../utils/error';
import successResponse from '../utils/success';
import imageUploader from '../helpers/photoUpload';
exports.updateUserProfile=async (req,res)=>{
const user=req.user.dataValues
// console.log(req.user)
        try {

            if(req.files) {
                const imageFile = await imageUploader(req);
                req.body.image=imageFile.url
            }
            if(!req.body.image)
            {
            req.body.image="https://cdn.onlinewebfonts.com/svg/img_337050.png"
            }
            const {firstName,lastName,username,phoneNumber,image,gender,preferredLanguage,preferredCurrency,department} = req.body;
            if(!firstName || !lastName || !username || !phoneNumber || !image || !gender || !preferredLanguage || !preferredCurrency || !department){
               return errorResponse(res,400,"Please fill empty fields!")
            }
            const updatedUser=  await User.update({
                firstName,lastName,username,phoneNumber,image,gender,preferredLanguage,preferredCurrency,department
            },{
                where:{id:user.id}
            })
            if(updatedUser)
            res.status(200).json({message:"user Profile updated well done"})

        } catch (error) {
            return errorResponse(res,500,error.message)
        }
    
}
