function insert(message){
	if(message!=='start')return;
	var ele=document.createElement("span");
	ele.setAttribute('id','musicList-extension');
	document.body.firstElementChild.insertBefore(ele,document.body.firstElementChild.firstElementChild);
	var ele=document.createElement("script");
	var src=chrome.runtime.getURL("ajaxListener.js");
	ele.setAttribute('src',src);
	ele.setAttribute('id','ajaxListener');
	document.body.firstElementChild.insertBefore(ele,document.body.firstElementChild.firstElementChild);
}
function download(){
	var str=document.getElementById('musicList-extension').innerText;
	var musics=JSON.parse(str);
	chrome.runtime.sendMessage(musics);
}

chrome.extension.onMessage.addListener(insert);
document.addEventListener('musicFinish',download);