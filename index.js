
//import express  framework
import express from 'express';
//import Registration module
import Registration from './dabatase/registration.js';
//import the handlebars engine 
import exphbs from 'express-handlebars';
//import body-parsers to handle the reading of template objects?
import bodyParser from 'body-parser';
//import express flash and session to use inconjuction for displaying error & reset messages
import flash from 'express-flash';
import session from 'express-session';
//import the database connection module
import db from './dabatase/db_connection.js';
import RegistrationListDB from './dabatase/database_logic.js';

import Example from './route/example.js';

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

//
let example = Example();

//Send objects by rending to the index using the Get Method
app.get('/', async (req, res) => {
    let userReg = await registration.getRegistrations();
    let isSelected = registration.isTownSelected();
    console.log(userReg);

    let errorMessage = req.flash('errors')[0];
    let resetMessage = req.flash('reset')[0];
    let showSelected = !userReg //hide the car registration when the selected item is called
    // console.log(registration.getSelectedTown());
    res.render('index', {
        car_registration: userReg,
        select_town: showSelected ? registration.getSelectedTown() : '',
        error_message: errorMessage,
        reset_message: resetMessage
    })
})

app.get('/reg_numbers/:registration_no', example.asiphe)

//post getting data from the drop-down form
app.post('/reg_number', async (req, res) => {
    let town = req.body.towns;
    let userReg = await registration.selectTown(town);
    res.redirect('/')
})
//post getting data from the input form 
app.post('/reg_numbers',async (req, res) => {
    let car_reg = req.body.car_reg;
    registration.validRegistration(car_reg.toUpperCase());
   await registration.addRegistrations(car_reg.toUpperCase());
let err = await registration.errors(car_reg.toUpperCase())
    req.flash('errors',err );
    res.redirect('/');

})

app.post('/reset', (req, res) => {
    registration.clear();
    req.flash('reset', 'Successfully cleared!')
    res.redirect('/')

})

//process the enviroment the port is running on
let PORT = process.env.PORT || 3000;
//listen on the port - opens the port on the terminal.
app.listen(PORT, () => {
    console.log('App started...', PORT);
})