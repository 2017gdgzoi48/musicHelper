function checkName(fileName){
	var arr=['<','>','\\','\/',':','"','*','?'];
	var nameArr=fileName.split('');
	nameArr=nameArr.filter((char)=>{return !arr.some(ele=>{return ele==char})});
	return nameArr.join('');
}
chrome.runtime.onMessage.addListener(function(message){
 	if(typeof message!=='object')return ;
 	var list=message;
 	list.forEach((ele)=>{
 		ele.name=checkName(ele.name);
		chrome.downloads.download({
			url: ele.link,
			filename: 'music/'+ele.name
		})
	});
});