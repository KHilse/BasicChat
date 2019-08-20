// MAKE A PLAIN VANILLA WEB SERVER
const express = require ("express");
const app = express ();
const http = require ("http").Server (app);
const io = require ("socket.io") (http);

// Serve static files relative to home in the static subfolder
app.use("/", express.static("static"));

http.listen (8000, () => {
	console.log("Server listening on port 3000");
});

app.get ("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
})

io.on("connection", function(socket) {
	console.log("Connected!");

	// server received a chat message,
	// now propagate it to other clients
	socket.on("chat message", function(msg) {
		io.emit("chat message", msg);
	})

	socket.on("disconnect", function() {
		console.log("a client disconnected");
	})
})