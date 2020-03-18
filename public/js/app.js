var socket = io();

socket.on("connect", function () {
	console.log("connected to socket.io server!");
});

socket.on("message", function (message) {
	var momentTimestamp = moment.utc(message.timeStamp);
	console.log("New message: ");
	console.log(message.text);

	jQuery(".messages").append('<p><strong>' + momentTimestamp.local().format('h:mm a') + ': </strong>' + message.text + '</p>');
})

function submit() {
	var fetchedStr = document.getElementById("text1").value;
	socket.emit("message", {text: fetchedStr});
	document.getElementById("text1").value = "";
}
