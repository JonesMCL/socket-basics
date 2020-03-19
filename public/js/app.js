var name = getQueryVariable("name") || "Anonymous";
var room = getQueryVariable("chatroom");
console.log("fetched Room: " + room);
console.log("fetched name: " + name);
var socket = io();

//Update h1 tag for room title
jQuery('.room-title-test').text(room);

console.log(name + ' wants to join ' + room);

socket.on("connect", function () {
	console.log("connected to socket.io server!");
	socket.emit("joinRoom", {
		name: name,
		room: room
	});
});

socket.on("message", function (message) {
	var momentTimestamp = moment.utc(message.timeStamp);
	//var $(message) = jQuery('.messages');

	console.log("New message: ");
	console.log(message.text);
	
	jQuery(".messages").append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong></p>');
	jQuery(".messages").append('<p>' + message.text + '</p>');
})

function submit() {
	var urlParams = new URLSearchParams(window.location.search);
	var messageFrom = urlParams.get("name");
	var roomName = urlParams.get("chatroom");
	// urlPrams und messageForm liefert richtiges Ergebnis
	var fetchedStr = document.getElementById("text1").value;
	socket.emit("message", {text: fetchedStr, name: messageFrom, room: roomName});
	document.getElementById("text1").value = "";
}