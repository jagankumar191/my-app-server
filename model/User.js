const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema
let userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String
  },
password: {
    type: String
  },
email: {
    type: String
  },
role: {
    type: String
  },
createdon: {
    type: String
  },
phone: {
    type: Number
  },
  
}, {
    collection: 'users'
  })

module.exports = mongoose.model('User', userSchema)

