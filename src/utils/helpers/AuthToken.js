import { status } from '../express/lib/response';
import { sign, verify } from 'jsonwebtoken';
import { config } from 'dotenv';
config();
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

