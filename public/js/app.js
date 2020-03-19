//var name = getQueryVariable("name");
//var room = getQueryVariable("room");
var socket = io();

//console.log(name + " wants to join " + room);

socket.on("connect", function () {
	console.log("connected to socket.io server!");
});

socket.on("message", function (message) {
	var momentTimestamp = moment.utc(message.timeStamp);
	//var $(message) = jQuery('.messages');

	console.log("New message: ");
	console.log(message.text);
	
	jQuery(".messages").append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong></p>');
	//console.log("jQuery Messages: " + jQuery(".messages").name + "message.name: " + message.name);
	//jQuery(".messages").append('<p><strong>' + momentTimestamp.local().format('h:mm a') + ': </strong>' + message.text + '</p>');
	jQuery(".messages").append('<p>' + message.text + '</p>');
})

function submit() {
	var urlParams = new URLSearchParams(window.location.search);
	var messageFrom = urlParams.get("name");
	// urlPrams und messageForm liefert richtiges Ergebnis
	var fetchedStr = document.getElementById("text1").value;
	socket.emit("message", {text: fetchedStr, name: messageFrom});
	document.getElementById("text1").value = "";
}
