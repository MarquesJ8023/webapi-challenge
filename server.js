const express = require ('express');
const projectRouter = require('./projects/projectRouter');
const actionRouter = require('./actionsFolder/actionRouter.js');
const server = express();

server.use(express.json());
server.use(logger);

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Don't worry, Be happy!</h2>`)
});

function logger(req, res, next) {
  const date = new Date();
  console.log(`(Logger) Request type: ${req.method}, Request url: ${req.url}, Timestamp: ${date}`)
  next();
};

module.exports = server;
