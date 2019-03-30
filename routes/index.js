const express = require('express');

const User = require('../models/User');
const AddOn = require('../models/AddOn');

const router = express.Router();

router.post('/info/:phoneNumber', (req, res, next) => {
  User.findOne({ number: req.params.phoneNumber })
    .populate('addOns')
    .then((user) => {
      console.log(user);
      res.json({ success: true, user });
    })
    .catch((err) => {
      console.error(err);
      res.json({ success: false, message: 'Error' });
    });
});

router.post('/add/:addOnId', (req, res, next) => {
  AddOn.find({})
    .then((addOns) => {})
    .catch((err) => {
      console.error(err);
      res.json({ success: false, message: 'Error' });
    });
});

router.post('/getAllOns', (req, res, next) => {
  AddOn.find({})
    .then((addOns) => {})
    .catch((err) => {
      console.error(err);
      res.json({ success: false, message: 'Error' });
    });
});

module.exports = router;
