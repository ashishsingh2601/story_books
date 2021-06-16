const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');

// const bodyparser = require('body-parser');


//loading config file
dotenv.config({path: './config/config.env'});

//passport config
require('./config/passport')(passport);

//connecting db
connectDB();

const app = express();

//body parser
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//method override
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//logging in
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//handlebars helpers
const {formatDate, stripTags, truncate, editIcon, select} = require('./helpers/hbs');

//handlebars
app.engine('.hbs', exphbs({helpers: {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
}, defaultlayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//express-session middleware
app.use(
    session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI})
    })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


//set global variable
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});



//routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

//static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 4000;

app.listen(PORT,
     console.log(`Server is up and running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);