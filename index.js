
//import express  framework
import express from 'express';
//import Registration module
import Registration from './service/registration.js';
//import the handlebars engine 
import exphbs from 'express-handlebars';
//import body-parsers to handle the reading of template objects?
import bodyParser from 'body-parser';
//import express flash and session to use inconjuction for displaying error & reset messages
import flash from 'express-flash';
import session from 'express-session';
//import the database connection module
import db from './dabatase/db_connection.js';
//database logic import
import RegistrationListDB from './dabatase/database_logic.js';
//routes imports
import RegistrationRoute from './route/registration_route.js';
import IndexRoute from './route/index_route.js';
//instantiate express module
let app = express();
//configuring the handlebars module 
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "<JesusLovesYou>",
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

// his ensures form variables can be read from the req.body variable
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//built-in static middleware from ExpressJS to use static resources such as my CSS
app.use(express.static('public'))

//instance of db factory function
let registrationListDB = RegistrationListDB(db);

//instance of the factory function 
let registration = Registration(registrationListDB);

//route instantiations
let index_route = IndexRoute(registration);
let reg_route = RegistrationRoute();

//Send objects by rending to the index using the Get Method
app.get('/', index_route.show)

app.get('/reg_numbers/:registration_no', reg_route.show_registration)

app.post('/reg_numbers', index_route.addRegistration)
//post getting data from the drop-down form
app.post('/reg_number', index_route.getSelection)
//post route to reset data from the page
app.post('/reset', index_route.reset)

//process the enviroment the port is running on
let PORT = process.env.PORT || 3000;
//listen on the port - opens the port on the terminal.
app.listen(PORT, () => {
    console.log('App started...', PORT);
})