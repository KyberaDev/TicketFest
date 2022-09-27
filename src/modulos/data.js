//* IMPORTS *//
const mysql = require("mysql");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

//* CONNECTION *//

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: `ticketfest_bd_v1.0.0`,
});

//* FUNCTIONS *//

async function get_usuarios(callback) {
    let result,
        err = null;
    try {
        result = await get_usuarios__promise();
    } catch (error) {
        err = error;
    }

    if (typeof callback == "function") callback(err, result);
}

async function get_usuarios_by_id(id, callback) {
    let result,
        err = null;
    try {
        result = await get_usuario_by_id__promise(id);
    } catch (error) {
        err = error;
    }

    if (typeof callback == "function") callback(err, result);
}

async function add_usuario(data, callback) {
    let result,
        err = null;
    data["id"] = uuidv4();
    data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));

    try {
        result = await add_usuario__promise(data);
    } catch (error) {
        err = error;
    }

    if (typeof callback == "function") callback(err, result);
}

async function get_grupos(callback) {
    let result,
        err = null;
    try {
        result = await get_grupos__promise();
    } catch (error) {
        err = error;
    }

    if (typeof callback == "function") callback(err, result);
}

async function get_grupos_by_id_usuario(id, callback) {
    let result,
        err = null;
    try {
        result = await get_usuarios__promise();
    } catch (error) {
        err = error;
    }

    if (typeof callback == "function") callback(err, result);
}

async function add_grupo(data, callback) {
    let result,
        err = null;
    data["id"] = uuidv4();
    data["inv_code"] = uuidv4();

    try {
        result = await add_grupo__promise(data);
    } catch (error) {
        err = error;
    }

    if (typeof callback == "function") callback(err, result);
}
//* EXPORTS *//

module.exports = {
    get_usuarios,
    get_usuarios_by_id,
    add_usuario,
    get_grupos,
    add_grupo,
};

//* PROMISES *//

function get_usuarios__promise() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM usuarios;`, (err, res, fields) => {
            if (err) reject(err);
            resolve(res);
        });
    });
}

function get_usuario_by_id__promise(id) {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM usuarios WHERE id = '${id}';`,
            (err, res, fields) => {
                if (err) reject(err);
                resolve(res[0]);
            }
        );
    });
}

function add_usuario__promise(data) {
    return new Promise((resolve, reject) => {
        connection.query(
            `CALL add_usuario('${data.id}','${data.name}', '${data.username}', '${data.mail}', '${data.password}');`,
            (err, res, fields) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(res);
                    if (res !== undefined) {
                        resolve(res[0][0].id);
                    } else {
                        throw new Error("No se pudo crear el usuario");
                    }
                }
            }
        );
    });
}

function get_grupos__promise() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM grupos;`, (err, res, fields) => {
            if (err) reject(err);
            resolve(res);
        });
    });
}

function add_grupo__promise(data) {
    return new Promise((resolve, reject) => {
        connection.query(
            `CALL add_grupo('${data.id}','${data.name}', '${data.inv_code}');`,
            (err, res, fields) => {
                if (err) {
                    reject(err);
                } else {
                    if (res !== undefined) {
                        resolve(res[0][0]);
                    } else {
                        throw new Error("No se pudo crear el grupo");
                    }
                }
            }
        );
    });
}
