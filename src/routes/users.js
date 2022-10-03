const { Router } = require('express');
const { loggedIn } = require('../lib/auth.js');
const { get_usuarios, get_usuarios_by_id, add_usuario} = require('../modulos/data.js');

const router = new Router();

router.get('/users', loggedIn, (req, res) => {
    get_usuarios((err, result) => {
        if (!err)
            res.send(result)
    })
})

router.get('/users/:id_user', loggedIn, (req, res) => {
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

router.post('/users', loggedIn, (req, res) => {
    const data = req.body;

})

router.put('/users', loggedIn, (req, res) => {
    res.send('Actualizar usuarios')
})

module.exports = router;