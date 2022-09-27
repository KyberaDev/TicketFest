/**
 *  API REST -- TiketFest
 */

// * imports * //
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const home_routes = require("./routes/home.js");
const users_routes = require("./routes/users.js");
const groups_routes = require("./routes/groups.js");
const tickets_routes = require("./routes/tickets.js");

const app = express();

//* SETTINGS *//

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("port", process.env.PORT || 3000);

// * middlewares * //

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("../TicketFest/web"));

//* ROUTES *//

// home
app.use(home_routes);

// usuarios
app.use(users_routes);

// grupos
app.use(groups_routes);

app.listen(app.get("port"), function () {
    console.log("listening on port " + app.get("port"));
});
