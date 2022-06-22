// this folder will contain routes methods, with the needed middlewares being passed as parameters ( ... )

import express from "express";
import trips from "./tripRequests.js";

const router = express.Router();

router.use("/trip", trips);

router.get("/users", async (req, res) => {
  res.send({
    message: "Nothing is set yet!",
  });
});

export default router;
