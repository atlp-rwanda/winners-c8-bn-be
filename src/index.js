import "core-js/stable";
import swaggerDocs from "./docs/tripRequestApi.json";
import swaggerUI from "swagger-ui-express";
import "regenerator-runtime/runtime";
import DB from "./database/index";
import express from "express";
import routes from "./routes/index";
import "dotenv/config";
import getDefault from "./helpers/getEnvironment";

// connecting to database
DB.authenticate().then(() => {
  console.log("Database Connected");
});

const PORT = getDefault(process.env.PORT, "5000");

const app = express();

// allow to parse json in body
app.use(express.json());

app.use("/api", routes);
routes.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.get("/", async (req, res) => {
  res.send({ message: "Hello World!" });
});

const server = app.listen(port, () => {
  console.log("Server has started!");
});

module.exports = server;
