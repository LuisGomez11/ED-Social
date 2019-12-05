const Moongoose = require('mongoose');
const schema = Moongoose.Schema;

const PublicationSchema = new schema({
    user: { type: String, required: true},
    publication: { type: String, required: true },
    createAt: { type: String, required: true }
});

exports.User = Moongoose.model('Publications', PublicationSchema);
