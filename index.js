import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import db from './config/config.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

const DBUserName = db.DATABASE_USERNAME;
const DBPassword = db.DATABASE_PASSWORD;
const DBCluster = db.DATABASE_CLUSTER;

const CONNECTION_URL = `mongodb+srv://${DBUserName}:${DBPassword}@${DBCluster}.82nlr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT} with Mongo !!!`)))
  .catch((err) => console.log(err));

app.use('/posts', postRoutes);
app.use('/auth', authRoutes);
app.use('/', (req, res) => {
  res.status(StatusCodes.OK).json({ message: `Server is running on ${PORT} `, routes: 'posts' });
});
