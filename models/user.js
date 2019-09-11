'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String
}, {
  timestamps: true
});

const signInStatic = require('./user-sign-in-static');
const signUpStatic = require('./user-sign-up-static');

userSchema.statics.signIn = signInStatic;
userSchema.statics.signUp = signUpStatic;


const User = mongoose.model('User', userSchema);

module.exports = User;
