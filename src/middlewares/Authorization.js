import { decodeToken } from '../utils/helpers/AuthToken';
import { User } from '../database/models/User';
const verifyToken = async(req,res,next) =>{
    try{
        const token = req.headers.authorization
        if(!token) {
            return res.status(403).json({message: "Token is required for authentication"});
        }
        const data =decodeToken(token)
        console.log(data);
        const {name} = data
        if(name==="jsonWebTokenError"){
            return res.status(403).json({error: "Invalid token"})
        }
        if(name===""){
            return res.status(401).json({error: "token is blacklisted"})
        }
        if (name==="TokenExpiredError"){
            return res.status(400).json({error: "Json Web Token is expired"})
        }
        req.user = data.data.user
        const user = await User.findOne({ where:{uuid: req.user.uuid}})
        next()
        console.log(user)
    } catch (error) {
        console.log(error);
        return res.status(404).json({error:"token is required"})
    }
}
export default verifyToken;