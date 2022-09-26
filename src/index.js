/**
 *  API REST -- TiketFest 
 */

// * imports * //
const morgan = require('morgan')
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const users_routes = require('./routes/users.js');
const groups_routes = require('./routes/groups.js');
//const tickets_routes = require('./routes/tickets.js');
//const homes_routes = require('./routes/home.js');
 

const app = express();

//* SETTINGS *//

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// * middlewares * //

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static('../TicketFest/web'))

//* ROUTES MIDDLEWARE *//

// usuarios
app.use(users_routes)

// grupos
app.use(groups_routes)

app.listen(3000)