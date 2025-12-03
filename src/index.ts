import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { roomHandler } from "./room/room";

import { ExpressPeerServer } from "peer";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/**
 * Health check endpoint.
 * @name get/health
 * @function
 */
app.get("/health", (_, res) => {
    res.send("Server is running");
});

const server = http.createServer(app);

// Integrate PeerJS Server with the main HTTP server
const peerServer = ExpressPeerServer(server, {
    path: "/",
    allow_discovery: true
});

/**
 * PeerJS server endpoint.
 */
app.use("/peerjs", peerServer);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    },
    transports: ['websocket', 'polling'] // Explicitly allow both
});


/**
 * Socket.IO connection handler.
 */
io.on("connection", (socket) => {
    console.log("a user connected");
    roomHandler(socket);
    socket.on("disconnect", () => console.log("user disconnected"));
});

// PeerJS events
peerServer.on('connection', (client) => {
    console.log(`PeerJS: Client connected with ID ${client.getId()}`);
});

peerServer.on('disconnect', (client) => {
    console.log(`PeerJS: Client disconnected with ID ${client.getId()}`);
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`PeerJS server running on path /peerjs`);
});
