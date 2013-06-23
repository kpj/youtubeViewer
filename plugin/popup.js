// nicer checking
if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function (str){
		return this.slice(0, str.length) == str;
	};
}

window.onload = function() {
	// set up text fields
	fields = ["h", "m", "s"];
	var then = new Date(new Date().getTime() + 30 * 1000);

	// handle key press
	var keydown = 0;
	var pressedKeyCodes = [];

	for(var i in fields) {
		document.getElementById("time_" + fields[i]).type = "text";
		document.getElementById("time_" + fields[i]).className = "right";
		document.getElementById("time_" + fields[i]).size = 2;
		document.getElementById("time_" + fields[i]).maxLength = 2;
		
		document.getElementById("time_" + fields[i]).addEventListener("keyup", function(e) {
			if(pressedKeyCodes.length <= 1) {
				var val = this.value;
				if(val.length == 2) {
					var id = this.id;
					if(id == "time_h") {
						document.getElementById("time_m").focus();
						document.getElementById("time_m").select();
					} else if(id == "time_m") {
						document.getElementById("time_s").focus();
						document.getElementById("time_s").select();
					} else if(id == "time_s")
						document.getElementById("submit").focus();
				}
			}
			var ind = pressedKeyCodes.indexOf(e.keyCode);
			pressedKeyCodes.splice(ind, 1);

			// error checking
			var val = this.value;
			if(isNaN(val))
				this.className = "wrong";
			else {
				this.className = "right";

				var id = this.id;
				if(id == "time_h") {
					if(val < 0 || val > 24)
						this.className = "wrong";
				} else {
					if(val < 0 || val > 59)
						this.className = "wrong";
				}

				if(val.toString().length != 2)
					this.className = "wrong";
			}	
		});
		
		document.getElementById("time_" + fields[i]).addEventListener("keydown", function(e) {
			var kc = e.keyCode;
			if(pressedKeyCodes.indexOf(kc) != -1) 
				return;
			pressedKeyCodes.push(kc);
		});

		if(fields[i] == "h")
			document.getElementById("time_h").value = (then.getHours() < 10?'0':'') + then.getHours();
		else if(fields[i] == "m")
			document.getElementById("time_m").value = (then.getMinutes()<10?'0':'') + then.getMinutes();
		else
			document.getElementById("time_s").value = (then.getSeconds() < 10?'0':'') + then.getSeconds();
	}
	
	var url;
	chrome.tabs.getSelected(function(tab) {
		url = tab.url;
		if(! url.startsWith("http://www.youtube.com/watch?v=")) {
			document.getElementById("submit").disabled = true;
			document.getElementById("submit").value = "Invalid url";
			throw "Wrong url";
		}
	});

	// set onClick handler
	document.getElementById("submit").onclick = function() {
			var parts = url.split("v=");
			var id = parts[1];
			console.log("Extracted: \""+id+"\"");

			var time = document.getElementById("time_h").value + ":" + document.getElementById("time_m").value + ":" + document.getElementById("time_s").value;

			var newUrl = "http://kpj.github.io/youtubeViewer/?id=" + id + "&time=" + time;

			// open new tab
			chrome.tabs.create({'url': newUrl}, function(tab) {
				console.log("Loaded \""+newUrl+"\"");
			});

			// copy to clipboard
  		//window.prompt("Copy to clipboard: Ctrl+C, Enter", newUrl);
	};
}
