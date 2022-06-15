import 'core-js/stable';
import swaggerDocs from './docs';
import swaggerUI from 'swagger-ui-express';
import "regenerator-runtime/runtime";
import DB from "./database/index";
import express from "express";
import routes from "./routes/index";
import index from "./routes/welcome";
import "dotenv/config";
import getDefault from './helpers/getEnvironment'

const PORT=getDefault(process.env.PORT, "5000")

// const app = express();

const app = express();

// allow to parse json in body
app.use(express.json());

app.use('/api', routes);
app.use('/', index);
DB.authenticate()
	.then(() => {
		console.log('Database Connected');
	})
	.catch((err) => {
		console.log('Database unable to connect', err);
	});
routes.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log("Server has started on port", PORT);
});

export default app;
