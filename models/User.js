const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  number: String,
  data: {
    base: Number,
    currentQuota: Number,
    usage: Number,
  },
  sms: {
    base: Number,
    currentQuota: Number,
    usage: Number,
  },
  talktime: {
    base: Number,
    currentQuota: Number,
    usage: Number,
  },
  addOns: [
    {
      type: Schema.Types.ObjectId,
      ref: 'AddOn',
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
