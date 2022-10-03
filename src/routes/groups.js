const ejs = require("ejs");
const { Router } = require("express");
const { add_grupo, get_grupos } = require("../modulos/data.js");
const path = require("path");
const { appendFile } = require("fs");

const router = new Router();

router.get("/groups", (req, res) => {
    get_grupos(async (err, result) => {
        if (!err) {
            console.log(result);
            req.flash('success', 'Grupos obtenidos')
            const html = await ejs.renderFile(
                path.join(
                    "./",
                    __dirname,
                    "../",
                    "views",
                    "pages",
                    "groups.ejs"
                ),
                { groups: result , success : req.flash('success')},
                { async: false }
            );
            res.send(html);
        } else console.log(err);
    });
});

router.get("/group", (req, res) => {
    res.render("pages/group");
});

router.get("/groups/addGroup", (req, res) => {
    res.render("pages/createGroup");
});

router.get("/groups/joinGroup", (req, res) => {
    res.render("pages/joinGroup");
});

router.post("/groups/addGroup", (req, res) => {
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
