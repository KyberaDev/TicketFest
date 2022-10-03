const { Router } = require("express");
const { loggedIn } = require("../lib/auth");
const router = new Router();

router.get("/tickets/createTicket", loggedIn, (req, res) =>
    res.render("pages/createTicket")
);

module.exports = router;
