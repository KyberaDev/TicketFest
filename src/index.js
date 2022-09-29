/**
 *  API REST -- TiketFest
 */

// * imports * //
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MySqlStore = require("express-mysql-session");
const { keys } = require("./modulos/data.js");
const passport = require("passport")
const home_routes = require("./routes/home.js");
const users_routes = require("./routes/users.js");
const groups_routes = require("./routes/groups.js");
const tickets_routes = require("./routes/tickets.js");
const authentication = require("./routes/authentcation.js");

const app = express();
require("./lib/passport")

//* SETTINGS *//

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("port", process.env.PORT || 3000);

// * middlewares * //

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new MySqlStore(keys)
}));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("../TicketFest/web"));
app.use(passport.initialize());
app.use(passport.session());

//* Global variables *//

app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    next();
})

//* ROUTES *//

// home
app.use(home_routes);

// usuarios
app.use(users_routes);

// grupos
app.use(groups_routes);

//tickets
app.use(tickets_routes);

//autenticacion
app.use(authentication);


app.listen(app.get("port"), function () {
    console.log("listening on port " + app.get("port"));
});
