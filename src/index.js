import express, { json } from 'express';
import { urlencoded } from 'body-parser';
import DB from './database';
import routes from './routes';
import 'dotenv/config'; 

const app = express();

const port = process.env.PORT || 5000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api', routes);

DB.authenticate()
	.then(() => {
		console.log('Database Connected');
	})
	.catch((err) => {
		console.log('Database unable to connect');
		console.error(err);
	});

app.listen(port, () => {
	console.log('Server has started!', port);
});

export default app;
