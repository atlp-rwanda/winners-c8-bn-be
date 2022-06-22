import "core-js/stable";
import swaggerDocs from "./docs";
import swaggerUI from "swagger-ui-express";
import DB from "./database/index";
import express from "express";
import routes from "./routes/index";

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
  res.send({ message: "Hello there!" });
});

const server = app.listen(port, () => {
  console.log("Server has started!");
});

module.exports = server;
