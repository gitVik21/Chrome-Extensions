

/*Gets URL information of all tabs in the active Window*/

function getURLinfo (info){ 
var x = info.length ;
var complete = [];
for (var i=0; i < x; i++)
complete[i] = info[i].url ;
return complete;
}


/*Saves the running tabs url and the input-given window name*/

function savetheWin( loc ){
var i = loc.winName.length ; 
chrome.tabs.query({currentWindow:true}, function(tabs){
loc.winName[i] = document.getElementById("WindowName").value;
loc.tabInfo[i] = getURLinfo(tabs);
chrome.storage.sync.set({'windows' : loc} , function(){
alert("Window Saved");
});
});
}

/*Deletes a single saved window*/

function deleteSin() {
var toClose = document.getElementById("WindowList").value;
chrome.storage.sync.get('windows', function(win){
var loc = win.windows;
var i = win.windows.winName.indexOf(toClose);
loc.winName.splice(i,1);
loc.tabInfo.splice(i,1);
chrome.storage.sync.set({'windows' : loc} , function(){
alert("Window Deleted");
});
});
}


/*Updates the List of saved windows in the dropdown menu*/

function updateList(){
chrome.storage.sync.get('windows', function(win){

var list = [];
list = win.windows.winName;
var x = document.getElementById("WindowList");

for (var i = 0; i<list.length; i++)
{
var opt = document.createElement("option");
opt.text = list[i];
x.add(opt);
}

});
}

/*As Extension opens, retrieve the saved windows list */

document.addEventListener('DOMContentLoaded', function(){
updateList();
});

/*Event Listener for Delete this window button */

document.getElementById("Delete").addEventListener('click', function(){
deleteSin();
});

/* Opens the selected window*/

document.getElementById("Open").addEventListener('click', function(){
var toOpen = document.getElementById("WindowList").value;
chrome.storage.sync.get('windows', function(win){
var i = win.windows.winName.indexOf(toOpen);
chrome.windows.create({url : win.windows.tabInfo[i]});
});
});


/*Deletes All saved Windows*/

document.getElementById("Remove").addEventListener('click', function(){
chrome.storage.sync.clear(function() {alert("Cleared All Windows");});
var windows = {};
windows.winName = [];
windows.tabInfo = [];
chrome.storage.sync.set({windows : windows});
});

/*This Event Listener will show you the saved windows*/

document.getElementById("Show").addEventListener('click', function(){
chrome.storage.sync.get('windows', function(win){
if (win.windows.winName.length == 0)
alert("No Windows Present");
else
alert(JSON.stringify(win.windows));
});
});


/* Event Listener for Save URLs button */

document.getElementById("Save URL").addEventListener('click', function(){
chrome.storage.sync.get('windows' , function(win){

var noOfWin = win.windows.winName.length ;
var name = document.getElementById("WindowName").value;
 
if (name == "")
alert("Enter Window Name");
else {
if (noOfWin < 5) 
savetheWin(win.windows) ; 
else 
alert("Limit Exceeded.");
}
});
}); 
