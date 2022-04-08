import express from 'express';
import { engine, create } from 'express-handlebars';
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { mongoose } from 'mongoose';
import activate_route_middleware from './middlewares/routes.mdw.js';

// connect MongoDB
import {} from 'dotenv/config'
mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', () => console.error('Database connection failed'));
db.once('open', async () => {
  console.info('Database connection established...');
});

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')))

activate_route_middleware(app);

const port = process.env.PORT || 3000;
app.listen(port, function () {});