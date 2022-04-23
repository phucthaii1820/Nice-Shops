import dotenv from "dotenv"
import express from 'express';
import numeral from 'numeral';
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import exphs from 'express-handlebars';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { mongoose } from 'mongoose';
import activate_route_middleware from './middlewares/routes.mdw.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import moment from "moment";
import handlebars_sections from "express-handlebars-sections";

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

// connect MongoDB
mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', () => console.error('Database connection failed'));
db.once('open', async () => {
  console.info('Database connection established...');
});

//Create if condition for engine handlebar
const hbs = exphs.create({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  helpers: {
    format_date(val) {
      return moment(val).format('DD-MM-YYYY, hh:mm:ss');
    },

    format_no_h(val) {
      if (val != null)
        return moment(val).format('DD-MM-YYYY');
    },

    Format_price(val) {
      return numeral(val).format('0,0');
    },

    inc(value, options) {
      return parseInt(value) + 1;
    },

    ifEqual: function(arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
    section: handlebars_sections()
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')))


activate_route_middleware(app);

const port = process.env.PORT || 3000;
app.listen(port, function () { });