import WebSocket, { WebSocketServer } from 'ws';
const wsPORT = 9090;

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
