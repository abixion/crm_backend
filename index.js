import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from "./routes/posts.js";

const app = express();

dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

const DBUserName = process.env.DATABASE_USERNAME;
const DBPassword = process.env.DATABASE_PASSWORD;

const CONNECTION_URL = `mongodb+srv://${DBUserName}:${DBPassword}@clusterreactjs.82nlr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT} with Mongo !!!`)))
    .catch((err) => console.log(err));

app.use('/posts', postRoutes);
app.use('/', (req, res) => {
    res.status(200).json({'message': `Server is running on ${PORT} `, 'routes': 'posts'});
});