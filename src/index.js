import "core-js/stable";
import "regenerator-runtime/runtime";
import DB from "./database";
import express from "express";
import routes from "./routes/index";

import "dotenv/config"; // Now, the "process.env" object's properties will include those from the .env file

DB.authenticate()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database unable to connect");
    console.error(err);
  });

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use("/api", routes);

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello World!",
  });
});

app.listen(port, () => {
  console.log("Server has started!");
});

export default app;