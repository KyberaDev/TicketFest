const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('../modulos/data');

passport.use("local.signup", new LocalStrategy({
    usernameField: "username",
    passwordField: "passwd",
    passReqToCallback: true
}, async (req, username, password, done) => {

    const { name, email } = req.body
    const Usuario = {
        username,
        password,
        name,
        email
    }
    
    await db.add_usuario(Usuario, (err, result) => {
        if (!err){
            Usuario.id = result
            console.log("Nuevo Usuario [ ID ] - " + result)
        }else 
            db.error(err.errno)
    })

    return done(null, Usuario);
}));


passport.serializeUser((usr, done) => {
    done(null, usr.id)
})

passport.deserializeUser(async (id, done) => {
    let rows
    await db.get_usuarios_by_id(id, (err, result) => {
        if (!err){
            rows = result
        }else 
            db.error(err.errno)
    })
    console.log(rows)
    done(null, rows.id)
})
