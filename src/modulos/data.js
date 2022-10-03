//* IMPORTS *//
const mysql = require("mysql");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

//* CONNECTION *//

const keys = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "ticketfest_bd_v1.0.0",
}

const connection = mysql.createConnection(keys);

const database = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "ticketfest_bd_v1.0.0",
});
//* FUNCTIONS *//

async function login(username, callback) {
    let result,
    err = null;

    try {
        result = await login__promise(username);
    } catch (error) {
        err = error;
    }

    if (typeof callback == "function") callback(err, result);
}

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
    data["email"] = ((data["email"] == '') ? null : "'"+data["email"]+"'");
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
    keys,
    error,
    login
};

//* PROMISES *//

function login__promise(username) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM usuarios WHERE usuario = '${username}';`, (err, res, fields) => {
            if (err) reject(err);
            resolve(res[0]);
        });
    });
}

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
            `CALL add_usuario('${data.id}','${data.name}', '${data.username}', ${data.email}, '${data.password}');`,
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

//* SHOW ERRORS *//
function error(error_no) {
    switch (error_no) {
        case 1062:
            console.log("Ya existe un usuario con ese nombre")
            break;
    
        default:
            console.log("Error desconocido en la base de datos.")
            break;
    }
}