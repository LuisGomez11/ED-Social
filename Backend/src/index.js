const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

const { Config } = require('./Configs/app.config');

const { mongoose } =  require('./database');

//Settings
app.set('port', Config.port);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes 
app.use(require('./Routes/UserRoutes'))

// Start server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});