// this folder will contain routes methods, with the needed middlewares being passed as parameters ( ... )
import express from "express";
const router = express.Router();

router.get("/users/", async (req, res) => {
    res.send({
      "message": "Nothing is set yet!"
    });
  });

export default router;