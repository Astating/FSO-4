const mongoose = require('mongoose');
const mongoToJson = require('./utils/toJson');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
});

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
