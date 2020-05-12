/* document.oncontextmenu = function (event) {
   event.preventDefault();
   * }; */
var cookable=window.location.search
var cookedRecords = document.cookie.split(";")
window.cookin=(s)=>{};
window.cookout=(f)=>{};

window.onload=()=>{
    [...document.querySelectorAll(".colorful-button, .dark-button")].forEach(b=>b.onkeydown=()=>b.blur())
}

var baseServer = window.origin + window.path;
var audiourl="audio/"

function getAudioEnclosure(){
    var soundSrcs = {}
    function res(w){
	if (soundSrcs[w]) {
	    return soundSrcs[w]
	}
	else {
	    var o = document.createElement("audio")
	    o.src = audiourl+w+".mp3"
	    soundSrcs[w] = o
	    return o
	}
    }
    return res
}

var getAudio = getAudioEnclosure()


if (chrome && chrome.storage && chrome.storage.local){
    window.cookout=(f)=>chrome.storage.local.get(['exciseuri'], (s)=>{f(s.exciseuri)})
    window.cookin=(s)=>{
	chrome.storage.local.set({"exciseuri":s}, ()=>console.log(" <-localdata set")) 
    }
}
else if (cookable.length <= 5 && cookedRecords[0].length>0){
    cookable = cookedRecords[0]
}
if (cookable.length>5) {
    window.cookout=f=>f(cookable)
}

