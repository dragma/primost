import express from 'express';

import { APP_PORT } from '../config';

const App = express();

App.get('/', (req, res) => res.send('OK'));

App.listen(APP_PORT, () => console.log(`[SERVER] is running at port ${APP_PORT}`));
