const http = require('http');
const express = require('express');
const Datastore = require('nedb');
const socketIo = require('socket.io');

const app = express();
app.use(express.static('client'));
app.use(express.json());
const server = http.createServer(app);

const database = new Datastore('database.db');
database.loadDatabase();

const io = socketIo(server);
io.on('connection',(sock)=>{
  sock.emit('message',"Connected!");
  console.log('connected!');
});
server.listen(3000, () => {
  console.log('server started');
});

app.get('/api',(request,response)=>{
  database.find({},(err,data)=>{
    if (err){
      console.log(err);
    }
    response.json(data);
  })
});

app.get('/prof',(request,response)=>{
  database.findOne({username: `${request.body}`},(err,data)=>{
    if(err){
      console.log(err);
    }
    response.json(data);
  });
});

app.post('/api',(request,response)=>{
  const data = request.body;
  database.insert(data);
  console.log(database);
  response.json(data);
});