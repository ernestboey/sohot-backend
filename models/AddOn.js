const mongoose = require('mongoose');

const { Schema } = mongoose;

const addOnSchema = new Schema({
  quotaType: {
    type: String,
    enum: ['data', 'sms', 'talktime'],
  },
  addOnType: {
    type: String,
    enum: ['purchase', 'promo', 'bonus'],
  },
  expiry: Date,
  amount: Number,
  name: String,
  price: Number,
});

const AddOn = mongoose.model('AddOn', addOnSchema);

module.exports = AddOn;
