import express from 'express';
import { engine, create } from 'express-handlebars';
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import activate_route_middleware from './middlewares/routes.mdw.js';


const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')))

activate_route_middleware(app);

const port = process.env.PORT || 3000;
app.listen(port, function () {});