const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
// in order to access the underlying object, need to invoke the function
const config = require('../webpack.config');
const compiler = webpack(config);
const app = express();

const PORT = process.env.PORT || 3000;

/* BODY-PARSING MIDDLEWARE */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if ( process.env.NODE_ENV !== 'production') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    // stats: false
  }));
  
  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, // eslint-disable-line
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));

  /* STATIC PATHS */
  app.use(express.static(path.join(__dirname, '..', 'client/src')));
  app.use(express.static(path.join(__dirname, '..', 'public')));
} else {
  const staticMiddleware = express.static('public/dist');
  app.use(staticMiddleware);
}

/* SERVER LISTENS */
app.listen(PORT, () => {
  console.log('SERVER LISTENING ON PORT: ', PORT); // eslint-disable-line
});

/* REQUIRE API INDEX */
app.use('/api', require('./api'));

app.get(/^\/(?!api\/)(?!assets\/)(?!.*\.json$).*/, (req, res) => {
  res.sendFile(path.join(compiler.outputPath, 'index.html'));
});

/* ERROR HANDLING MIDDLEWARE */
app.use('/', (err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).send(err.message || 'INTERNAL SERVER ERROR');
});