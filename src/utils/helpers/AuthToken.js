import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
<<<<<<< HEAD
class AuthToken{ static TokenGenerator(data){ const token=sign({ data },
      
        process.env.JWT_SECRET_KEY
        ,{
            expiresIn: '24h'
        }
        );
        return token;
    }
    static decodeToken(Token){
        try{
            const data= verify(Token ,process.env.JWT_SECREY_KEY);
            return data;
        }
        catch(error){
            console.log(error);
            return status(404).json({error: 'Invalid Token'});
        }
    }
}
module.exports = AuthToken;
=======

class AuthToken{ static TokenGenerator(data) { const token=jwt.sign({ data },
        process.env.JWT_SECRET_KEY,{
            expiresIn: '24h'
        });
        return {token};   
    }
    static decodeToken(token){try{const data= jwt.verify(token ,process.env.JWT_SECRET_KEY);
    return {data};
}
catch(error){console.log(error);
return res.status(401).json({error: "Invalid Token"});
}}}


export default AuthToken;
>>>>>>> 92b0beb (feat(Auth check middlewares): Coveralls test)

