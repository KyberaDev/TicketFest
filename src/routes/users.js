const { Router } = require('express');
const { get_usuarios, get_usuarios_by_id, add_usuario} = require('../modulos/data.js');

const router = new Router();


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

router.get('/users', (req, res) => {
    get_usuarios((err, result) => {
        if (!err)
            res.send(result)
    })
})

router.get('/users/:id_user', (req, res) => {
    const { id_user } = req.params
    get_usuarios_by_id(id_user, (err, result) => {
        if (!err)
            if (result !== undefined) 
                res.send(result)
            else
                res.send({
                     "message": "No se encontro el usuario" 
                    })
        else
            console.error(err)
    })
})

router.post('/users', (req, res) => {
    const data = req.body;
    add_usuario(data, (err, result) => {
        if (!err)
            res.send("Nuevo Usuario [ ID ] - " + result)
        else 
            res.send(err)
    })
})

router.put('/users', (req, res) => {
    res.send('Actualizar usuarios')
})

module.exports = router;