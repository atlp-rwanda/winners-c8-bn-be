import "core-js/stable";
import swaggerDocs from './docs';
import swaggerUI from 'swagger-ui-express';
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

const {PORT} = process.env;


const app = express();

app.use(express.json());

app.use("/api", routes);
routes.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.get("/", async (req, res) => {
  res.send({
    message: "Hello World!",
  });
});

app.listen(PORT, () => {
  console.log("Server has started on port", PORT);
});

export default app;
