'use strict';

const express = require("express");
const passportRouter = express.Router();

//--- ITERATION 01 ---
// Require user model - Is required in app.js
// Add bcrypt to encrypt passwords - Bcrypt is required in models/user-sign-up-static.js

// Add passport 
const passport = require('passport');

// Middleweares for route protection
const ensureLogin = require("connect-ensure-login");
const routeGuardMiddleware = require('./../controllers/route-guard-middleware');

passportRouter.get('/signup',(req, res)=>{
  res.render('passport/signup');
});

passportRouter.post('/signup', passport.authenticate('sign-up', {
  successRedirect: "/",
  failureRedirect: "/signup"
}));

passportRouter.get('/login',(req, res)=>{
  res.render('passport/login');
});

passportRouter.post('/login', passport.authenticate('sign-in', {
  successRedirect: "/",
  failureRedirect: "/login"
}));

//With passport, information about the connected user is saved inside req.user and not req.session.user

//REVIEW ENSURE LOGIN
//------ solution 1: ------ Protect a route with a middleware from a package
// passportRouter.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
// res.render("passport/private", { user: req.user });
// });

//------ solution 2: ------ Protect a route with a custom middleware 
passportRouter.get("/private-page", routeGuardMiddleware, (req, res, next) => {
res.render("passport/private", { user: req.user });
});


module.exports = passportRouter;
