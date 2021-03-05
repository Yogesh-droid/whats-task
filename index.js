
//const io=require('socket.io')(8080);
var app=require('express')();
var path=require('path');
var http=require('http').Server(app);
var io=require('socket.io')(http,
    {cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    
  }});

//const server=io.listen;

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
    //res.send('hello')
});

io.on('connection',(socket)=>{
    console.log("Client connected  : "+socket.id)

    socket.broadcast.emit("greeting",{msg:"Welcome", user: "user_"+socket.id});

    socket.emit("greeting",{msg:"Welcome", user: "user_"+socket.id});

    socket.on("msg", (data) => {
        console.log(data);
        socket.broadcast.emit("msg", data);
        socket.emit("msg", data);
    });
})

http.listen(process.env.PORT||8080);