const { Router } = require("express");
const router = new Router();

router.get("/", (req, res) => res.render("pages/index"));

router.get('/login', (req, res) => {
    get_usuarios((err, result) => {
        if (!err)
            res.send(result)
    })
})

router.get('/register', (req, res) => {
    get_usuarios((err, result) => {
        if (!err)
            res.send(result)
    })
})

module.exports = router;
