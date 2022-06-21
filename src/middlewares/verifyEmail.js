// import { User } from '../database/models'
// const verifyEmail = async(req,res,next)=>{
//     try{
//         const user = await User.findOne({where: {email:req.body.email} })
//         if(user.isVerified){
//             next()
//         } else {
//             res.status(201).json({message:"please check your email to verify account"})
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({error: "User credintials not found"})
//     }
// }
// export default verifyEmail;