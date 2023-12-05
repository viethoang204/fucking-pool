import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Bigpool API Documentation',
    description: 'Description'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./routers/rounds.js', './routers/eventPlayers.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);