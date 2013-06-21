// nicer checking
if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function (str){
		return this.slice(0, str.length) == str;
	};
}

window.onload = function() {
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
