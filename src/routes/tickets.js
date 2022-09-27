const { Router } = require("express");
const router = new Router();

router.get("/tickets/createTicket", (req, res) =>
    res.render("pages/createTicket")
);

module.exports = router;
