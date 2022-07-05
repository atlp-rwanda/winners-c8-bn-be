import jwt from 'jsonwebtoken'
import  asyncHandler from 'express-async-handler'
import { User } from '../database/models';

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

      // Get user from the token
      req.user = await User.findOne({where:{id:decoded.id}})

      next()
    } catch (error) {
      console.log(error)
      res.status(401).json({message:'Not authorized'})
    }
  }

  if (!token) {
    res.status(401).json({message:'Not authorized, no token'})
  }
})

export { protect}