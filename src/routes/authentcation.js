const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const path = require("path");
const passport = require("passport")

router.get('/signup', async (req, res) => {
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

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}));
/*


router.get('/login', async (req, res) => {
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