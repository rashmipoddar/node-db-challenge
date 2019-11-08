const express = require('express');
const helmet = require('helmet');

const projectRoutes = require('./data/projectRoutes');

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/projects', projectRoutes);

server.get('/', (req, res) => {
  res.status(200).send('Testing');
});

module.exports = server;