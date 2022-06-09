import "core-js/stable";
import swaggerDocs from './docs';
import swaggerUI from 'swagger-ui-express';
import "regenerator-runtime/runtime";
import DB from "./database";
import express from "express";
import routes from "./routes/index"
import user from "./routes/resetSample"

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

//sample user email reset link
app.use('/users', user)

routes.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.get("/", async (req, res) => {
  res.send({ message:'Hello there!' });
});

app.listen(port, () => {
  console.log(`Server has started! at Port ${port}`);
});
