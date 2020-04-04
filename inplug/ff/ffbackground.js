browser.browserAction.onClicked.addListener((tab)=>{
    browser.tabs.create({
	"url":"/index.html",//chrome.extension.getURL('index.html'),
	"active":true
    })
})
