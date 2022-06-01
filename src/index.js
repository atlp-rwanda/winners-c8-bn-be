import "core-js/stable";
import DB from "./database/index";
import express from "express";
import routes from "./routes/index"
import cors from "cors";

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
app.use(cors())

app.use(express.json());

app.use("/api", routes);

app.get("/", async (req, res) => {
  res.send({ message:'Hello there!' });
});

app.listen(port, () => {
  console.log(`Server has started! at Port ${port}`);
});
