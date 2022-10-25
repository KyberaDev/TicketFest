const { Router } = require("express");
const ejs = require("ejs");
const path = require("path");
const router = new Router();
const { get_user_name } = require("../modulos/data.js");
const { loggedIn } = require("../lib/auth");

router.get("/", loggedIn, async (req, res) => {
    const html = await ejs.renderFile(
        path.join(
            "./",
            __dirname,
            "../",
            "views",
            "pages",
            "index.ejs"
        ),
        { 
            name: await get_user_name(req.user)
         },
        { async: false }
    );
    res.send(html);
});


module.exports = router;
