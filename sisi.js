import express from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import pgPromise from 'pg-promise';
import createGreetingApp from './greetings.js';
const app = express();
const greet = createGreetingApp();
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: false,
    layoutDir: "./views/layouts",
});
// Serve static files from the 'public' directory
app.use(express.static('public'));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }));

const pgp = pgPromise();
const db = pgp({
    connectionString: 'postgres://greetings_56o5_user:j33VLLfyHvKsIRPszuI2bhsZRb2OIyY9@dpg-cjhkunb6fquc73d5n9d0-a.oregon-postgres.render.com:5432/greetings_56o5',
    ssl: { rejectUnauthorized: false }
});

app.get('/', (req, res) => {
    res.render('index', {
        greeting: greet.displayGreetings(),
        greetedCounter: greet.getNameCount(),
        validationMessage: greet.handleGreetBtnClick()
    })
});

app.post('/namesTrack/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { language, newName } = req.body;
    console.log(`New name: ${newName}, Language: ${language}`); // Log the entered data to the terminal
    const updateQuery = 'UPDATE users SET language = $1, name = $2 WHERE id = $3';
    await db.none(updateQuery, [language, newName, userId]);
    res.redirect('/');
});


app.get('/greetings', (req, res) => {
    res.render('index', { greetedCount: greet.getNameCount() });
});

app.get('/greetAction', function (req, res) {
    const greetedNames = greet.greetFunction();
    res.render('greetAction', { greetedNames, greet });
})

app.get('/userCount/:userName', (req, res) => {
    const userName = req.params.userName;
    const greetCountForUser = greet.getGreetCountForUser(userName);
    const greetMessage = `${userName} has been greeted ${greetCountForUser} times.`;
    res.send(greetMessage);
});

app.post('/reset', function (req, res) {
    greet.reset();
    res.render('index', {
        validationMessage: '',
        greetedCount: 0,
        action: ''
    });
});

app.post('/greetings', (req, res) => {
    const name = req.body.name;
    const language = req.body.language;
    // const validationMessage = greet.handleGreetBtnClick(name, language);
    const greetingMessage = greet.getGreetingMessage(language, name);
    console.log(greetingMessage)

}
);
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
    console.log('App started at port', PORT);
});