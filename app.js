const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');
const path = require('path');


//loading config file
dotenv.config({path: './config/config.env'});

//connecting db
connectDB();

const app = express();

//logging in
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//handlebars
app.engine('.hbs', exphbs({defaultlayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//router
app.use('/', require('./routes/index'));

//static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 4000;

app.listen(PORT,
     console.log(`Server is up and running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);