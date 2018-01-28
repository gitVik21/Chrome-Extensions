

/* Event listener for adding an object named windows  on extension installing */

chrome.runtime.onInstalled.addListener ( function(){
        chrome.storage.sync.get('windows', function(win){
	if (win.windows == undefined) {
		var windows = {};
		windows.tabInfo = [];
		windows.winName = [];
		chrome.storage.sync.set({ 'windows' : windows});
	}
});
});