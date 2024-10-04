const express = require('express')
const path = require('path')
const hbs = require('express-handlebars');
const morgan = require('morgan');
const route = require('./routes');
const db = require('./app/config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

//config port
const port = 3000;
//cookie
app.use(cookieParser());
//debug logger
app.use(morgan('combined'));
//config absoluted direction
app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.join(__dirname, '/public/')))
app.use('/admin', express.static(path.join(__dirname, '/public/')))

// config template handlebar.engine
app.engine('.hbs', hbs.engine({
    extname: 'hbs',
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
}
));
app.set('view engine', 'hbs');
app.set('views', './src/resources/views')

app.use(express.json());
app.use(express.urlencoded());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(bodyParser.json())
    .use(bodyParser.urlencoded());


//link routes
route(app)
//connect to db
db.connect()


//run app
app.listen(port, () => console.log(`Your app run on port: ${port}`))

