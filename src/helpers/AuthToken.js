import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { stat } from 'fs';
config();

class AuthToken{ static TokenGenerator(data) { 
    const token=jwt.sign({ data },
        process.env.JWT_SECRET_KEY,{
            expiresIn: '24h'
        });
        return {token};   
    }
    static decodeToken(token){
        try
        {
        const data= jwt.verify(token ,process.env.JWT_SECRET_KEY);
    return {data};
}
catch(error){console.log(error);
return res.status(401).json({error: "Invalid Token"});
}}}


export default AuthToken;