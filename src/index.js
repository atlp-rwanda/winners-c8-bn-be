import swaggerDocs from "./docs";
import swaggerUI from "swagger-ui-express";
import DB from "./database/index";
import express from "express";
import routes from "./routes/index";
import "dotenv/config";
import fileUpload from "express-fileupload";
import getDefault from "./helpers/getEnvironment";
import path from "path";
import io from "./utils/chat-bot";
import cors from 'cors';

const PORT = getDefault(process.env.PORT, "3000");

const app = express();
app.use(cors());

// allow to parse json in body
app.use(express.json());
app.use(fileUpload({useTempFiles: true}))

app.use("/api", routes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.get("/", (request, response) => {
  response.status(200).json({ message: "Hello World!" });
});
DB.authenticate().then(() => {
  DB.sync();
  console.log("Database Connected");
});

const server = app.listen(PORT, () => {
  console.log("Server has started on port", PORT);
});

io.attach(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/chats', (req,res)=>{
  res.sendFile(path.join(`${__dirname}/public/login.html`));
})
export default app;
