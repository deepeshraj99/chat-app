const express = require("express");
const app = express();
const http=require("http").createServer(app)
const fs = require('fs');
        
app.use(express.static(__dirname + "/public"))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

//socket
const io =require("socket.io")(http)
io.on("connection",(socket)=>{
    console.log("connected...");
    socket.on("message",(msg)=>{
        socket.broadcast.emit("message",msg)
    })
    socket.on('base64 file', function (msg) {
      console.log('received base64 file from' + msg.username);
      socket.username = msg.username;
      // socket.broadcast.emit('base64 image', //exclude sender
      io.sockets.emit('base64 file',  //include sender
    
          {
            username: socket.username,
            file: msg.file,
            fileName: msg.fileName
          }
    
      );
    });
    
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


http.listen(port, function() {
  console.log("Server  has started Successfully");
});
