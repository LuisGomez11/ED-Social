const Moongoose = require('mongoose');
const schema = Moongoose.Schema;

const UserSchema = new schema({
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, default: 'https://image.flaticon.com/icons/svg/660/660611.svg' },
    createAt: { type: Date, default: Date.now }
});

exports.User = Moongoose.model('Users', UserSchema);