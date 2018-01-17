
	chrome.runtime.sendMessage({value : "This is amazing."}, function(response){
	alert(response);
	});
	