const ejs = require("ejs");
const { Router } = require("express");
const { add_grupo, get_group_data, get_grupos_by_id_usuario, get_group_members, get_all_groups_members } = require("../modulos/data.js");
const path = require("path");
const { loggedIn } = require("../lib/auth.js");

const router = new Router();

router.get("/groups", loggedIn,(req, res) => {
    
    get_grupos_by_id_usuario(req.user, async (err, result) => {
        console.log(await get_all_groups_members())
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
                { 
                  groups: result,
                  members: await get_all_groups_members()
                },
                { async: false }
            );
            res.send(html);
        } else console.log(err);
    });
});

router.get("/group/:id_grupo", loggedIn, (req, res) => {
    const { id_grupo } = req.params
    get_group_data(id_grupo, async (err, result) => {
        const html = await ejs.renderFile(
            path.join(
                "./",
                __dirname,
                "../",
                "views",
                "pages",
                "group.ejs"
            ),
            { 
                group_data: result,
                group_members: await get_group_members(id_grupo)
             },
            { async: false }
        );
        res.send(html);
    })
});

router.get("/groups/joinGroup", loggedIn, (req, res) => {
    res.render("pages/joinGroup");
});

router.get("/groups/addGroup", loggedIn, (req, res) => {
    res.render("pages/createGroup");
});

router.post("/groups/addGroup", loggedIn, (req, res) => {
    const data = req.body;
    data.user = req.user
    add_grupo(data, (err, result) => {
        if (!err) {
            console.log("Creador del grupo [ ID ] - " + req.user);
            console.log("Nuevo Grupo       [ ID ] - " + result.id);
            console.log("Codigo de ingreso [ IC ] - " + result.inv_code);
            res.send(result);
        } else res.send(err);
    });
});

module.exports = router;
