function applySource(u) {
	globalPlayer.setSrc(u);

	// start buffering ??!?!??!?!??!
	//globalPlayer.load();
	//globalPlayer.play();
	//globalPlayer.pause();
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
	throw "Missing arguments";
}

// parse time ; format: "hour:minute:second"
var playTime = $_GET["time"].split(":");
var now = new Date();
var then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), playTime[0], playTime[1], playTime[2], 0);
if(then < now) {
	throw "Time set in the past";
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
	success: function(media, node, player) {
		globalPlayer = player;

		console.log("Setting source to \"" + url + "\"");
		applySource(url);
	}
});
