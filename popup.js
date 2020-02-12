function start(){
	chrome.tabs.query({active: true, currentWindow: true},function(tabs){
		chrome.tabs.sendMessage(tabs[0].id,'start');
	});
}
setTimeout(()=>{document.getElementById('start').onclick=start},200);