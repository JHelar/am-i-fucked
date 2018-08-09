const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const makeAnnouncement = require('./services/announcement');
const makeTrainStation = require('./services/train-station');

const SERVER_PORT = process.env.SERVER_PORT || 3030
const app = express(feathers());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.configure(express.rest());
app.use(express.errorHandler());
app.listen(SERVER_PORT, () => console.log(`Server listening on port: ${SERVER_PORT}`));

makeAnnouncement(app)
makeTrainStation(app)