const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
    debug: true,
});
app.use("/peerjs", peerServer);
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send("Hello World");
});

app.get("/:id", (req, res) => {
    res.json({
        status: "OK",
    });
});

io.on("connection", (socket) => {
    socket.on("join-room", (id, peerId) => {
        socket.join(id);
        socket.to(id).broadcast.emit("user-connected", peerId);
    });
});

server.listen(process.env.PORT || 3001);
