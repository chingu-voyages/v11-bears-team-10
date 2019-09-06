import express from 'express';
import morgan from 'morgan';
import debug from 'debug';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import compression from 'compression';
import { config } from 'dotenv';
import Response from './utils/Response';


config();

const app = express();
const port = process.env.PORT || 6000;
const debugged = debug('server');

app.use(morgan('dev'));
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => Response.success(res, 200, 'Bears team 10!'));

app.use((err, req, res, next) => {
  // We log the error internally
  debugged('err', err);
  //  Remove error's `stack` property. We don't want users to see this at the production env
  const error = process.env.NODE_ENV === 'development' ? err : {};

  Response.error(res, err.status || 500, error);
  next();
});

app.use((req, res, next) => {
  Response.error(res, 404, 'Page does not exist');
  next();
});

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });

app.listen(port, () => debugged(`Server running on port ${port} 🔥`));

export default app;
