import swaggerDocs from "./docs";
import swaggerUI from "swagger-ui-express";
import DB from "./database/index";
import express from "express";
import routes from "./routes/index";
import "dotenv/config";
import getDefault from "./helpers/getEnvironment";
import socket from "socket.io";
import path from "path";

const PORT = getDefault(process.env.PORT, "5000");

const app = express();

// allow to parse json in body
app.use(express.json());

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

// Socket setup
const io = socket(server);
io.on('connection', socket=>{
  console.log('socket connected')
})
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1/users/chats', (req,res)=>{
  res.sendFile(path.join(`${__dirname}/public/chat.html`));
})
export default app;
