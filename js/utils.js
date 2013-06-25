// control playback
function play() {
	globalPlayer.play();
}
function pause() {
	globalPlayer.pause();
}

// control volume
function setVolume(val) {
	globalPlayer.setVolume(val);
}
function changeVolume(val) {
	globalPlayer.setVolume(globalPlayer.getVolume() + val)
}
