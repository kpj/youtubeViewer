// nicer checking
if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function (str){
		return this.slice(0, str.length) == str;
	};
}

// checks for time format
function correctTimeFormat(t) {
	p = t.split(":");

	// correct format
	if(p.length != 3)
		return false;

	// only two digits
	for(var i in p)
		if(p[i].toString().length != 2)
			return false;

	// correct range
	var h = parseInt(p[0]);
	var m = parseInt(p[1]);
	var s = parseInt(p[2]);
	if(isNaN(h) || h < 0 || h > 24)
		return false;
	if(isNaN(m) || m < 0 || m >= 60)
		return false;
	if(isNaN(s) || s < 0 || s >= 60)
		return false

	return true;
}

window.onload = function() {
	// check time format
	document.getElementById("time").addEventListener("keyup", function() {
		if(correctTimeFormat(document.getElementById("time").value))
			document.getElementById("time").className = "right";
		else
			document.getElementById("time").className = "wrong";
	});

	// set onClick handler
	document.getElementById("submit").onclick = function() {
		chrome.tabs.getSelected(function(tab) {
			var url = tab.url;

			if(! url.startsWith("http://www.youtube.com/watch?v=")) {
				throw "Wrong url";
			}
			var parts = url.split("v=");
			var id = parts[1];
			console.log("Extracted: \""+id+"\"");

			var newUrl = "http://kpj.github.io/youtubeViewer/?id=" + id + "&time=" + document.getElementById("time").value;

			chrome.tabs.create({'url': newUrl}, function(tab) {
				console.log("Loaded \""+newUrl+"\"");
			});
		});
	};
}
