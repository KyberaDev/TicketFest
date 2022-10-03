const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const path = require("path");
const passport = require("passport");
const { notLoggedIn } = require("../lib/auth");

router.get('/signup', notLoggedIn, async (req, res) => {
    const html = await ejs.renderFile(
        path.join(
            "./",
            __dirname,
            "../",
            "views",
            "auth",
            "register.ejs"
        ),
        { status: 0 },
        { async: false }
    );
    res.send(html);
});

router.post('/signup', notLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}));



router.get('/login', notLoggedIn, async (req, res) => {
    const html = await ejs.renderFile(
        path.join(
            "./",
            __dirname,
            "../",
            "views",
            "auth",
            "login.ejs"
        ),
        { status: 0 },
        { async: false }
    );

    res.send(html);
})

router.post('/login', notLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});


/*
router.post('/signup', async (req, res) => {
    const data = req.body
    console.log(data.name)
    const html = await ejs.renderFile(
        path.join(
            "./",
            __dirname,
            "../",
            "views",
            "auth",
            "register.ejs"
        ),
        { status: 1 , redirect: "/login", type: 1, description: "Ahora podras ingresar a tu cuenta!"},
        { async: false }
    );
    res.send(html)
})
*/

module.exports = router;