const Moongoose = require('mongoose');
const schema = Moongoose.Schema;

const Message = new schema({
  message: { type: String, required: true },
  user: { type: schema.Types.ObjectId, ref: 'Users', required: true },
  createAt: { type: Date, default: Date.now },
});

const Conversation = new schema({
  messages: { type: [Message], default: [] },
  members: { type: [{ type: schema.Types.ObjectId, ref: 'Users', required: true }], required: true },
  mreateAt: { type: Date, default: Date.now }
});

exports.Conversation = Moongoose.model('Conversation', Conversation);