import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import WebSocket, { WebSocketServer } from 'ws';

import { tweetsRouter } from './routes/routerTweets.js';
import { usersRouter } from './routes/routerUsers.js';
import { searchRouter } from './routes/routerSearch.js';

const app = express();
const PORT = process.env.PORT || 9000;
const wsPORT = process.env.PORT || 9090;

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

const wss = new WebSocketServer({port: wsPORT})
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
          // console.log('data', data);
        }
      });
    });
  });

app.get('/', (req, res) => {
    res.send('Works - alles wird wieder ok - Deployment');
});

app.listen(PORT, () => console.log('Server is listening on Port: ', PORT));