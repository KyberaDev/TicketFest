const { Router } = require("express");
const router = new Router();
const { loggedIn } = require("../lib/auth");

router.get("/", loggedIn, (req, res) => {
    res.render("pages/index")
});


module.exports = router;
