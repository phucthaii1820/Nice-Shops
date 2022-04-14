import express from 'express';
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import exphs from 'express-handlebars';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { mongoose } from 'mongoose';
import activate_route_middleware from './middlewares/routes.mdw.js';
import multer from 'multer';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const app = express();

import {} from 'dotenv/config'
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

// connect MongoDB
import {} from 'dotenv/config'
mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', () => console.error('Database connection failed'));
db.once('open', async () => {
  console.info('Database connection established...');
});

const hbs = exphs.create({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  helpers:{
    ifCond: function(v1,v2,option){
      if (v1 === v2) return option.fn(this);
      return option.inverse(this);
    }
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')))


activate_route_middleware(app);

const port = process.env.PORT || 3000;
app.listen(port, function () {});