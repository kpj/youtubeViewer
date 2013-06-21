// display error messages
function showError(msg) {
	var errDiv = document.createElement("div");

	errDiv.innerHTML = msg;
	errDiv.className = "error";

	document.getElementById("wrapper").appendChild(errDiv);

	throw msg;
}

// some global variables
var globalPlayer = null;

// parse GET parameters
(function(){
	var s = window.location.search.substring(1).split('&');
	if(!s.length) return;
		window.$_GET = {};
		for(var i  = 0; i < s.length; i++) {
			var parts = s[i].split('=');
			window.$_GET[unescape(parts[0])] = unescape(parts[1]);
		}
}())

// check if needed ones are given
if($_GET["id"] == undefined || $_GET["time"] == undefined) {
	document.write("GET parameters: id (id of youtube video) and time (format: hh:mm:ss)");
	showError("Missing arguments");
}

// parse time ; format: "hour:minute:second"
var playTime = $_GET["time"].split(":");
if(playTime.length != 3) {
	showError("Poorly formatted time");
}
var now = new Date();
var then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), playTime[0], playTime[1], playTime[2], 0);
if(then < now) {
	showError("Time set in the past");
}

setTimeout(function() {
	console.log("Starting video");
	globalPlayer.play();
}, then - now);

// parse id ; format: "http://www.youtube.com/watch?v=id"
var id = $_GET["id"];
var url = "http://www.youtube.com/watch?v=" + id;

// set source when player is ready
$('#video').mediaelementplayer({
	features: ["postroll"],
	success: function(media, node, player) {
		globalPlayer = player;

		// set url
		console.log("Setting source to \"" + url + "\"");
		globalPlayer.setSrc(url);

		// enable auto buffering
		media.addEventListener("canplay", function() {
			globalPlayer.setMuted(true);
			globalPlayer.play();
			globalPlayer.pause();
			globalPlayer.setMuted(false);
		});
	}
});
