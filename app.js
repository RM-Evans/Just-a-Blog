
const express = require('express');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');

const sequelize = require('./config/connection');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({
    helpers
});

const app = express();
const PORT = process.env.PORT || 3001;

// enable session and expire
const sess = {
    secret: "Secret",
    // cookie: { maxAge: 500000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

//express middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// set handlebars as view model
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// session middleware
app.use(session(sess));

// turn on routes
app.use(routes);



sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log
        (`-----------Just a Blog listening on port ${PORT}!-----------`));
});