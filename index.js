const express = require('express');
const cores = require('cors');
const routerApi = require('./routes/index');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;


app.use(express.json());


const whitelist = ['http://localhost:8080', 'http://myapp.com', 'http://localhost:3000'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'), false);
    }
  }
}

app.use(cores(options));


app.get('/', (req, res) => {
  res.send('Proyect Api');
});


routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
