const express = require('express');
const helmet = require('helmet');

const projectRoutes = require('./data/projectRoutes');
const resourceRoutes = require('./data/resourceRoutes');

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/projects', projectRoutes);
server.use('/resources', resourceRoutes);

server.get('/', (req, res) => {
  res.status(200).send('Testing');
});

module.exports = server;