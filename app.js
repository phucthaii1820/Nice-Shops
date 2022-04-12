import express from 'express';
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import { engine } from 'express-handlebars';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { mongoose } from 'mongoose';
import activate_route_middleware from './middlewares/routes.mdw.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// connect MongoDB
import {} from 'dotenv/config'
mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', () => console.error('Database connection failed'));
db.once('open', async () => {
  console.info('Database connection established...');
});

app.engine('handlebars', engine({
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')))


activate_route_middleware(app);

const port = process.env.PORT || 3000;
app.listen(port, function () {});