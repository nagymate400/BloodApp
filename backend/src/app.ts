import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { connectionOptions } from './ormconfig';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const doctorRoute = require('./routes/doctor.router');
const donorRoute = require('./routes/donor.router');
const donationPlaceRoute = require('./routes/donationPlace.router');
const donation = require('./routes/donation.router');

app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

createConnection(connectionOptions)
  .then(async (connection) => {
    app.listen(3000, () => console.log('Successfully listening on 3000 ...'));
    console.log('Connected to database.');
  })
  .catch((error) => console.log(error));

app.get('/test', (req, res, next) => {
  console.log(req.body);
  res.send('hello');
});

app.use('/api/doctor', doctorRoute);
app.use('/api/donor', donorRoute);
app.use('/api/donationplace', donationPlaceRoute);
app.use('/api/donation', donation);
