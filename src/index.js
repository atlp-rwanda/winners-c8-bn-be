import "core-js/stable";
import "regenerator-runtime/runtime";
import express from "express";
import routes from "./routes/index";

import 'dotenv/config';     // Now, the "process.env" object's properties will include those from the .env file

const port = process.env.PORT || 5000;

const app = express();
    
app.use(express.json());

app.use("/api", routes);

app.get("/", async (req, res) => {
    res.send({
      "message": "Hello World!"
    });
  })

app.listen(port, () => {
    console.log("Server has started!");
});