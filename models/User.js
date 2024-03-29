const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoToJson = require('./utils/toJson');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
