const { Router } = require("express");
const router = new Router();
const ejs = require("ejs");
const path = require("path");


router.get('/login', (req, res) => {
    get_usuarios((err, result) => {
        if (!err)
            res.send(result)
    })
})

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
        { groups: "result" },
        { async: false }
    );

    res.send(html);
})

router.post('/signup', (req, res) => {
    const data = req.body
    console.log(data.name)
    res.send("registrado")
})

module.exports = router;