const ejs = require("ejs");
const { Router } = require("express");
const { add_grupo, get_grupos } = require("../modulos/data.js");
const path = require("path");
const { appendFile } = require("fs");
const { loggedIn } = require("../lib/auth.js");

const router = new Router();

router.get("/groups", loggedIn,(req, res) => {
    get_grupos(async (err, result) => {
        if (!err) {
            const html = await ejs.renderFile(
                path.join(
                    "./",
                    __dirname,
                    "../",
                    "views",
                    "pages",
                    "groups.ejs"
                ),
                { groups: result },
                { async: false }
            );
            res.send(html);
        } else console.log(err);
    });
});

router.get("/group", loggedIn, (req, res) => {
    res.render("pages/group");
});

router.get("/groups/addGroup", loggedIn, (req, res) => {
    res.render("pages/createGroup");
});

router.get("/groups/joinGroup", loggedIn, (req, res) => {
    res.render("pages/joinGroup");
});

router.post("/groups/addGroup", loggedIn, (req, res) => {
    const data = req.body;
    add_grupo(data, (err, result) => {
        if (!err) {
            console.log("Nuevo Grupo       [ ID ] - " + result.id);
            console.log("Codigo de ingreso [ IC ] - " + result.inv_code);
            res.send(result);
        } else res.send(err);
    });
});

module.exports = router;
