var links=[];
var mNames=[];
var musics=[];
var ev=document.createEvent('HTMLEvents')
ev.initEvent('musicFinish');

function getList(){
	var str=localStorage.getItem('track-queue');
	var mList=JSON.parse(str);
	mList.forEach(function(ele){
		var artistList=ele.artists;
		var name=ele.name;
		var artists='';
		artistList.forEach(function(artist){
			artists+=artist.name+' ';
		});
		mNames.push(artists+'- '+name);
	});
}
function getVarName(){
	var dic=[];
	for(var i=0;i<26;i++)dic.push(String.fromCharCode(65+i));
	for(var i=0;i<26;i++)dic.push(String.fromCharCode(97+i));
	for(var i=0;i<10;i++)dic.push(String.fromCharCode(48+i));
	for(var c1=0;c1<62;c1++){
		for(var c2=0;c2<62;c2++){
			for(var c3=0;c3<62;c3++){
				for(var c4=0;c4<62;c4++){
					var varName='c'+dic[c1]+dic[c2]+dic[c3]+dic[c4];
					if(typeof window[varName] !=='undefined')return varName;
				}
			}
		}
	}
}
function getMusicList(){
	var len=mNames.length;
	var cur=0;
	var linkName=getVarName();
	var handle=setInterval(()=>{
			document.querySelector("#g_player > div.btns > a.nxt").click();
			var newLink=window[linkName];
			if(newLink!==links[links.length-1])links.push(newLink);
			if(links.length>=len){
				while(cur<len){
					var end=links[cur].slice(-4);
					musics.push({'link':links[cur],'name':mNames[cur]+end});
					cur++;
				}
				sendList();
				clearInterval(handle);
			}
		},200);
}
function sendList(){
	var str=JSON.stringify(musics);
	document.getElementById('musicList-extension').innerText=str;
	document.dispatchEvent(ev);
}

getList();
getMusicList();

// function changeAjax(){
// 	var url='https://music.163.com/weapi/song/enhance/player/url/v1?csrf_token=';
// 	tmp1=XMLHttpRequest.prototype.send;
// 	function tmpSend (data) {
// 		tmp1.call(this,data);
// 		tmp2=this.onreadystatechange;
// 		if(tmp2!=null&&tmp2.toString().indexOf('alert')!=-1)return;
// 		function tmpChange(data){
// 			if(tmp2!==null)tmp2.call(this,data);
// 			if(this.readyState!=4)return;
// 			console.log(this);
// 			if(this.responseText==='')return ;
// 			var link=JSON.parse(this.responseText);
// 			link=link['data'][0]['url'];
// 			if(link!==undefined)links.push(link);
// 			console.log(link);
// 			this.readyState=-1;
// 		}
// 		this.onreadystatechange=tmpChange;	
// 	}
// 	XMLHttpRequest.prototype.send=tmpSend;
// 	// xhr=new XMLHttpRequest();
// 	// xhr.open("GET",document.URL);
// }


// 