
//import express  framework
import express from 'express';
//import Registration module
import Registration from './registration.js';
//import the handlebars engine 
import exphbs from 'express-handlebars';
//import body-parsers to handle the reading of template objects?
import bodyParser from 'body-parser';
//import express flash and session to use inconjuction for displaying error & reset messages
import flash from 'express-flash';
import session from 'express-session';
//import the database connection module
import db from './db_connection.js';

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

//instance of the factory function 
let registration = Registration();

//Send objects by rending to the index using the Get Method
app.get('/', (req, res) => {
    let userReg = registration.getRegistrations();
    let isSelected = registration.isTownSelected();
    console.log(registration.getSelectedTown());
    res.render('index', {
        car_registration: userReg,
        select_town: registration.getSelectedTown()
    })


})

app.get('/reg_numbers/:registration_no', (req, res) => {
    let registration_no = req.params.registration_no;

})
// app.get('/:town', (req, res) => {
//     const selectedTown = req.params.town;
//     res.redirect('/');

//     // Process the selectedTown value and get the list of towns that match
//     // This could involve filtering the registration_list based on the selectedTown
//     // const selectedTowns = registration.getSelectedTown(selectedTown);
//     // Then send the list of selected towns back as a response
//     // res.send(selectedTowns);


// });
app.post('/reg_number', (req, res) => {
    let town = req.body.towns;
    console.log(town);
    registration.selectTown(town);
})

app.post('/reg_numbers', (req, res) => {
    let car_reg = req.body.car_reg;
    registration.validRegistration(car_reg);
    registration.addRegistrations(car_reg);
    res.redirect('/');
})

//process the enviroment the port is running on
let PORT = process.env.PORT || 3000;
//listen on the port - opens the port on the terminal.
app.listen(PORT, () => {
    console.log('App started...', PORT);
})