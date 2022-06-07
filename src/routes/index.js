// this folder will contain routes methods, with the needed middlewares being passed as parameters ( ... )

import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  res.send({
    message: "Welcome to winner api!",
  });
});

export default router;
