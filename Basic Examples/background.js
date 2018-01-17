

	chrome.browserAction.onClicked.addListener(function(tabs) {
	chrome.tabs.executeScript({file : "content.js"});	
	});

	chrome.runtime.onMessage.addListener(function(message, sender,send ){
	alert(message.value);
	alert(JSON.stringify(sender));
	send("Yes, I know it is.");
	});	