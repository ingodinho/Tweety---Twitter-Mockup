import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { tweetsRouter } from './routes/routerTweets.js';
import { usersRouter } from './routes/routerUsers.js';
import { searchRouter } from './routes/routerSearch.js';

const app = express();
const PORT = process.env.PORT || 9000;

// logging middleware
app.use(morgan('dev'));

// cors policy
app.use(cors());

// JSON Body Parser
app.use(express.json());

// controllers
app.use('/tweets', tweetsRouter);
app.use('/users', usersRouter);
app.use('/search', searchRouter);


app.get('/', (req, res) => {
    res.send('Works - alles wird wieder ok - Deployment');
});

app.listen(PORT, () => console.log('Server is listening on Port: ', PORT));