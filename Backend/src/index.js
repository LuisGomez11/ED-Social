const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

const { Config } = require('./Configs/app.config');

const { mongoose } =  require('./database');

// Configuraciones
app.set('port', Config.port);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Rutas
app.use(require('./Routes/UserRoutes'))

// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
