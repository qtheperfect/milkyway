var isff = window.browser != undefined && browser.browserAction != undefined 
var isch = window.chrome != undefined && chrome.browserAction != undefined && chrome.browserAction.onClicked != undefined
if (isff) {
    browser.browserAction.onClicked.addListener((tab)=>{
	browser.tabs.create({
	    "url":"/index.html",//chrome.extension.getURL('index.html'),
	    "active":true
	})
    })
}
else if (isch) {
    chrome.browserAction.onClicked.addListener((tab)=>{
	chrome.tabs.create({
	    "url":chrome.extension.getURL('index.html'),
	    "active":true
	})
    })
}
