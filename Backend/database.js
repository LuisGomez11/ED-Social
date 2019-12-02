const mongoose = require('mongoose');
const { Config } = require('./Configs/app.config');

mongoose.connect(Config.db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
})
    .then(db => console.log('DB Connected'))
    .catch(err => console.error(err));

module.exports = mongoose;