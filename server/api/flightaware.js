/* eslint-disable camelcase */

const router = require('express').Router();
const { Client } = require('node-rest-client');

const client_options = {
  user: process.env.FLIGHTAWARE_USERNAME,
  password: process.env.FLIGHTAWARE_APIKEY,
};

const fxmlUrl = 'https://flightxml.flightaware.com/json/FlightXML3/';
const client = new Client(client_options);

router.get('/', (req, res, next) => {
  // const { origin, destination } = req.body;
  const origin = 'YUL';
  const destination = 'JFK';
  const findFlightArgs = { parameters: { origin, destination, type: 'nonstop' } };
  client.registerMethod('findFlights', `${fxmlUrl}FindFlight`, 'GET');
  return client.methods.findFlights(findFlightArgs, data => res.json(data));
});

router.get('/airport', (req, res, next) => {
  // default
  const airport_code = 'YUL';
  const findAirportInfoArgs = { parameters: { airport_code } };
  client.registerMethod('airportInfo', `${fxmlUrl}AirportInfo`, 'GET');
  return client.methods.airportInfo(findAirportInfoArgs, data => res.json(data));
});

module.exports = router;
