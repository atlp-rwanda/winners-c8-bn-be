import swaggerDocs from "./docs";
import swaggerUI from "swagger-ui-express";
import DB from "./database/index";
import express from "express";
import routes from "./routes/index";
import "dotenv/config";
import getDefault from "./helpers/getEnvironment";

const PORT = getDefault(process.env.PORT, "5000");

const app = express();

// Connect to Database
DB.authenticate()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database unable to connect", err);
  });

// allow to parse json in body
app.use(express.json());

app.use("/api", routes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.get("/", (request, response) => {
  response.status(200).json({ message: "Hello World!" });
});

const server = app.listen(port, () => {
  console.log("Server has started!");
});

module.exports = server;
