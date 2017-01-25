function openOptions(){
		var url = "options.html";
		var fullUrl = chrome.extension.getURL(url);//chrome-extension://your extension id//options.html	
		chrome.tabs.create({ url: url});
	}

chrome.browserAction.onClicked.addListener(openOptions);