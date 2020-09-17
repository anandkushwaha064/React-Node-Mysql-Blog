const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const appRouter = require('./routes/index');
const {
  productionErrors,
  developmentErrors,
} = require('./handlers/errorhandler');

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/', appRouter);
// app.use('/')

app.use((req, res, next) => {
  // res.setHeader(('Content-Type', 'application/json'));
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

if (app.get('env') === 'development') {
  app.use(developmentErrors);
}
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
