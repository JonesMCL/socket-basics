var socket = io();

socket.on("connect", function () {
	console.log("connected to socket.io server!");
});

socket.on("message", function (message) {
	console.log("New message: ");
	console.log(message.text);
})

function submit() {
	var fetchedStr = document.getElementById("text1").value;
	socket.emit("message", {text: fetchedStr});
	document.getElementById("text1").value = "";
}
