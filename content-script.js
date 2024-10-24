async function replace() {
	if(repEnabled){
		var file;
		if(censorEnabled){
			const response = await fetch(chrome.runtime.getURL('images/custom/customPack.txt'));
    		const data = await response.text();
			// Split the file content by newlines to create an array
			var imageNames = data.split('\n');
		}else{
			file = '2d/' + (Math.floor(Math.random() * 74) + '.jpg');
		}
		var images = document.querySelectorAll("img");
		for (var i = 0; i < images.length; i++) {
				if (images[i].id != 'overlay'){
					console.log("about to replace with " + file);
					if(censorEnabled){
						images[i].src = await chrome.runtime.getURL('images/' + 'custom/' + imageNames[Math.floor(Math.random() * (imageNames.length-1))]);
					}else{
						images[i].src = await chrome.runtime.getURL('images/' + '2d/' + (Math.floor(Math.random() * 74) + '.jpg'));
					}
				}
		}
	}
}

/*
function loadPack(){
	fetch(chrome.runtime.getURL('images/custom/customPack.txt'))
		.then(response => response.text())
		.then(data => {
			// Split the text content by line breaks into an array
			imageNames = data.split(/\r?\n/);
			console.log('Array of lines:', lines);
		})
		.catch(error => {
			console.error('Error reading the file:', error);
		});
}*/

	function replaceLinks() {
	if(urlChangeEnabled){
		var url;
		if(censorEnabled){
			url = 'data/links3d.txt';
		}else{
			url = 'data/links2d.txt';
		}
			fetch(chrome.runtime.getURL(url))
		.then(response => response.text())
		.then(data => {
		// Split the file content by newlines to create an array
		var arrayOfStrings = data.split('\n').map(line => line.trim());
		var urls = document.querySelectorAll("a");
			for (var i = 0; i < urls.length; i++) {
				if(Math.floor(Math.random() * 100)<=linkchance){
					var index = Math.floor(Math.random() * arrayOfStrings.length);
					console.log("replacing " + urls[i].href + " with " + arrayOfStrings[index]);
					urls[i].href = arrayOfStrings[index];
				}
			}
		})
		.catch(error => {
		console.error('Error loading the file:', error);
		return arrayOfStrings;
		});
	}
	}

  chrome.runtime.onMessage.addListener((message) => {
	switch (message["type"]) {
	  case "swapper":
		repEnabled = message["content"];
        chrome.storage.sync.set({'swapper': message["content"]}, function() {
			console.log("swapper with " +  message["content"]);
        });
		console.log("replace with status " + message["content"] + " received");
		break;
	  case "urlChange":
		urlChangeEnabled = message["content"];
		chrome.storage.sync.set({'urlChange': message["content"]}, function() {
			console.log("urlChange with " +  message["content"]);
		});
		break;
		case "rlrslider":
			linkchance = message["content"];
			chrome.storage.sync.set({'rlrslider': message["content"]}, function() {
				console.log("rlrslider with " +  message["content"]);
			});
			replaceLinks();
			break;
		case "censor":
			censorEnabled = message["content"];
			chrome.storage.sync.set({'censor': message["content"]}, function() {
				console.log("censor with " +  message["content"]);
			});
			break;
    default:
	}
  });



var repEnabled = true;
// Read it using the storage API
chrome.storage.sync.get(['swapper'], function(items) {
	repEnabled = items["swapper"];
	console.log("restored swapper with " + repEnabled);
});

chrome.storage.sync.get(['censor'], function(items) {
	censorEnabled = items["censor"];
	console.log("restored censor with " + repEnabled);
});

chrome.storage.sync.get(['urlChange'], function(items) {
	urlChangeEnabled = items["urlChange"];
	console.log("restored urlChange with " + urlChangeEnabled);
});

chrome.storage.sync.get(['rlrslider'], function(items) {
	linkchance = items["rlrslider"];
	replaceLinks();
	console.log("restored rlrslider with " + linkchance);
});

var linkchance;
var urlChangeEnabled;

console.log("Here we go!");
replaceLinks();
setInterval(replace, 1000);
