/* document.oncontextmenu = function (event) {
   event.preventDefault();
   * }; */
var cookable=""
var cookedRecords = document.cookie.split(";")
window.cookin=(s)=>{};
window.cookout=(f)=>{};

if (chrome && chrome.storage && chrome.storage.local){
    window.cookout=(f)=>chrome.storage.local.get(['exciseuri'], (s)=>{cookable=s.exciseuri; f(cookable)})
    window.cookin=(s)=>{
	chrome.storage.local.set({"exciseuri":s}, ()=>console.log(s, " <-localdata")) 
    }
}
else if (cookedRecords[0].length>0){
    cookable = cookedRecords[0]
}
