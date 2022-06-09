// this folder will contain routes methods, with the needed middlewares being passed as parameters ( ... )

import express from "express";
const router = express.Router();
import {UserControllers} from '../controllers/usersControllers'
router.get("/users/", async (req, res) => {
    res.send({
      message: "Nothing is set yet!"
    });
  });

router.get('/assignRole',UserControllers.assignRole)
export default router
