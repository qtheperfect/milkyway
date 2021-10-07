/* document.oncontextmenu = function (event) {
   event.preventDefault();
   * }; */
var cookable=window.location.search
var cookedRecords = document.cookie.split(";")
window.cookin=(s)=>{};
window.cookout=(f)=>{};

window.onload=()=>{
    [...document.querySelectorAll(".colorful-button, .dark-button")].forEach(b=>b.onkeydown=()=>b.blur())
    document.getElementById("overall-restyle").onclick = changeTheme
}

var baseServer = window.location.origin + window.location.pathname;
var audiourl="audio/"

function getAudioEnclosure(){
    var soundSrcs = {}
    function res(w){
	if (soundSrcs[w]) {
	    return soundSrcs[w]
	}
	else {
	    var o = document.createElement("audio")
	    o.src = audiourl + w + ".mp3"
	    soundSrcs[w] = o
	    return o
	}
    }
    return res
}

var getAudio = getAudioEnclosure()

function getOrElse(o, l){
    if (l.length == 0)
	return o
    else if (o == undefined)
	return o
    else
	return getOrElse(o[l[0]], l.slice(1))
}

var pluginStorage = getOrElse(window, ["chrome", "storage", "local"])
if (pluginStorage){
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

function changeTheme(themeNum  = -1){
    var themeList = [
	{noter:"Switch To DARK Theme", href:"app/milkyway-light.css"},
	{noter:"Switch To LIGHT Theme", href:"app/milkyway-dark.css"}
    ]
    var css = document.getElementById("overall-style")
    var styleButton = document.getElementById("overall-restyle")
    var currentThemeIndex = styleButton.attributes["currentThemeIndex"]
    currentThemeIndex = currentThemeIndex ? parseFloat(currentThemeIndex.value) : 1

    var tmNew = ( themeNum >= 0 ? themeNum : (currentThemeIndex + 1) ) % themeList.length
    
    if (! themeList[tmNew]) {
	console.log(`Error in theme change to ${tmNew}`)
	return
    }
    else
	console.log(`Theme switched to ${tmNew} replacing ${currentThemeIndex}`)
    
    styleButton.value = themeList[tmNew].noter
    styleButton.onclick = e => changeTheme(-1)
    css.href = themeList[tmNew].href
    styleButton.setAttribute("currentThemeIndex", tmNew)
}
