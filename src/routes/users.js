/* eslint-disable no-console */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
import express from 'express';
import AuthToken from '../utils/helpers/AuthToken';


const userRouter = express.Router();
userRouter.use(AuthToken)



userRouter.get("/users/", async (req, res) => {
    res.send({
      "message": "Nothing is set yet!"
    });
  });

export default userRouter