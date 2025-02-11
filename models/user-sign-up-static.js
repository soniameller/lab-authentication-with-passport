'use strict';

const bcrypt = require('bcrypt');

// Create a sign in static that is going to abstact the authentication functionality
module.exports = function(username, password) {
  const Model = this;

  return Model.findOne({username})
    .then(user=>{
      if (user) {
        throw new Error('USER_ALREADY_EXISTS');
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then(hash => {
      return Model.create({
        username,
        passwordHash: hash
      });
    })
    .then(user => {
      return Promise.resolve(user);
    })
    .catch(error => {
      console.log(error);
      return Promise.reject(new Error('There was an error in the sign up process.'));
    });
};
