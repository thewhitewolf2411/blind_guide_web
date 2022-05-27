import fs, { readFile } from "fs";
import path from "path";
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import HttpError from './models/HttpError';

import authRoutes from './routes/AuthRoutes';
import productRoutes from './routes/ProductRoutes';
import mobileApiRoutes from './routes/MobileApiRoutes';

import seedDB from './database/seeders/UserSeeder';

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use("/storage/audio", express.static(path.join("storage", "audio")));

app.use(express.static(path.join(__dirname, '/views/')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

//Authorisation Routes
app.use('/api', authRoutes);

//Mobile Routes
app.use('/api/mobile', mobileApiRoutes);

//Product Routes
app.use('/api/web', productRoutes);

app.get('/', (req, res) => {
  readFile(__dirname + '/views/index.html', 'utf8', (err, text) => {
      res.send(text);
  });
});

app.use((req, res, next) => {
  throw new HttpError(404, "Could not find this route.");
});

app.use((error, req, res, next) => {

  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect("mongodb+srv://theWhiteWolf2411:fJKbT4qkOnKzp0Gp@cluster0.kvrmd.mongodb.net/saytel?retryWrites=true&w=majority")
  .then(() => {
    seedDB();
    app.listen(process.env.PORT || port);
  })
  .catch((err) => {
    console.log(err);
  });