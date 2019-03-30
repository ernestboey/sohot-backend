const express = require('express');

const User = require('../models/User');
const AddOn = require('../models/AddOn');

const router = express.Router();

router.get('/info/:phoneNumber', (req, res) => {
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

router.get('/add/:addOn/:phoneNumber', (req, res) => {
  console.log(req.params);
  AddOn.findOne({ amount: req.params.addOn })
    .then((addOn) => {
      console.log(addOn);
      return User.findOne({ number: req.params.phoneNumber }).then((user) => {
        user.addOns.push(addOn.id);
        user.data.currentQuota += addOn.amount;
        return user.save();
      });
    })
    .then(() => User.findOne({ number: req.params.phoneNumber })
      .populate('addOns')
      .then((user) => {
        console.log(user);
        res.json({ success: true, user });
      }))
    .catch((err) => {
      console.error(err);
      res.json({ success: false, message: 'Error' });
    });
});

router.get('/getAllOns', (req, res) => {
  AddOn.find({})
    .then((addOns) => {
      console.log(addOns);
      res.json({ success: true, addOns });
    })
    .catch((err) => {
      console.error(err);
      res.json({ success: false, message: 'Error' });
    });
});

router.post('/debug/addNumber', (req, res) => {
  new User({
    name: 'Test',
    number: '123',
    data: {
      base: 3,
      currentQuota: 3,
      usage: 0,
    },
    sms: {
      base: 100,
      currentQuota: 100,
      usage: 0,
    },
    talktime: {
      base: 100,
      currentQuota: 100,
      usage: 0,
    },
    addOns: [],
  })
    .save()
    .then(() => User.findOne({ number: '123' })
      .populate('addOns')
      .then((user) => {
        console.log(user);
        res.json({ success: true, user });
      }))
    .catch((err) => {
      console.error(err);
      res.json({ success: false, message: 'Error' });
    });
});

router.post('/debug/addAddon/:amount', (req, res) => {
  new AddOn({
    quotaType: 'data',
    addOnType: 'purchase',
    amount: req.params.amount,
    name: `Add ${req.params.amount}GB`,
    price: `$${req.params.amount}`,
  }).save()
    .then(() => User.findOne({ number: '123' })
      .populate('addOns')
      .then((user) => {
        console.log(user);
        res.json({ success: true, user });
      }))
    .catch((err) => {
      console.error(err);
      res.json({ success: false, message: 'Error' });
    });
});

module.exports = router;
