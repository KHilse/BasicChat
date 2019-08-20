console.log("Hello world");

const socket = io();
const chatFormEl = document.getElementById("chat-form");
chatFormEl.addEventListener("submit", function (event) {
	event.preventDefault();
	var name = event.target.name.value;
	var message = event.target.chat.value;
	socket.emit("chat message", {
		name,
		message
	});
	event.target.chat.value = "";
})

socket.on("chat message", function(msg) {
	var p = document.createElement("p");
	p.innerHTML = "<strong>" + msg.name + "</strong> " + msg.message;
	document.getElementById("messages").appendChild(p);
})
