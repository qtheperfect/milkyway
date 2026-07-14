
browser.action.onClicked.addListener((tab)=>{
    browser.tabs.create({
	"url":"/index.html",//chrome.extension.getURL('index.html'),
	"active":true
    })
})

if (false) {
    chrome.action.onClicked.addListener((tab)=>{
	chrome.tabs.create({
	    "url":chrome.runtime.getURL('/index.html'),
	    "active":true
	})
    })
}
