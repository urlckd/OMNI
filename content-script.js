async function replace() {
	if(repEnabled){
		var images = document.querySelectorAll("img");
		for (var i = 0; i < images.length; i++) {
				if (images[i].id != 'overlay'){
					var number = Math.floor(Math.random() * 74);
					images[i].src = await chrome.runtime.getURL('images/' +  number + '.jpg');
				}
		}
	}
}

	function replaceLinks() {
	if(urlChangeEnabled){
			fetch(chrome.runtime.getURL('data/links.txt'))
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
		linkchance = message["content"];
		chrome.storage.sync.set({'urlChange': message["content"]}, function() {
			console.log("urlChange with " +  message["content"]);
		});
		replaceLinks();
		break;
		case "rlrslider":
			linkchance = message["content"];
			chrome.storage.sync.set({'rlrslider': message["content"]}, function() {
				console.log("rlrslider with " +  message["content"]);
			});
			replaceLinks();
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
