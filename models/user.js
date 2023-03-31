let mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    subscription: {
      endpoint: String,
      keys: {
        p256dh: String,
        auth: String
      }
    }
  });


module.exports = mongoose.model("user", UserSchema)