/* eslint-disable no-console */
import swaggerUI from 'swagger-ui-express';
import express from 'express';
import swaggerDocs from './docs';
import DB from './database';
import routes from './routes';

import 'dotenv/config'; // Now, the "process.env" object's properties will include those from the .env file

DB.authenticate()
  .then(() => {
    console.log('Database Connected');
  })
  .catch((err) => {
    console.log('Database unable to connect');
    console.error(err);
  });

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use('/api', routes);
routes.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.get('/', async (req, res) => {
  res.send({
    message: 'Hello World!',
  });
});

app.listen(port, () => {
  console.log('Server has started!');
});
