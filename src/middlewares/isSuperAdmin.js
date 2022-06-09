import jwt from 'jsonwebtoken'

export function isSuperAdmin (req, res, next){
    const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if(token == null) return res.status(401).json({message:'Token is required'})

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user)=>{
        console.log(error.message)
		if(error) return res.status(403).json({message:"Invalid Token"})

		
        if(user.id !== "013dddd7-2769-4de6-8fc3-7aa527114879"){
            return res.status(403).json({status: 403, message: 'super admin is only allowed to perform this task', });
        }

		req.user = user;
		next();
	})

}