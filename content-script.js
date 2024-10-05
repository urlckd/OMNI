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


fetch(chrome.runtime.getURL('data/links.txt'))
	.then(response => response.text())
	.then(data => {
	// Split the file content by newlines to create an array
    var arrayOfStrings = data.split('\n').map(line => line.trim());
	var urls = document.querySelectorAll("a");
		for (var i = 0; i < urls.length; i++) {
			if(Math.floor(Math.random() * 100)>98){
				var index = Math.floor(Math.random() * arrayOfStrings.length);
				urls[i].href = arrayOfStrings[index];
			}
		}
	})
	.catch(error => {
	console.error('Error loading the file:', error);
	return arrayOfStrings;
	});

	function replaceLinks() {
		var urls = document.querySelectorAll("a");
		for (var i = 0; i < urls.length; i++) {
			if(Math.floor(Math.random() * 100)>10){
				var index = Math.floor(Math.random() * links.length);
				console.log("replacing " + urls[i].href + " with " + index);
				urls[i].href = links[index];
			}
		}
	}

  chrome.runtime.onMessage.addListener((message) => {
	switch (message["type"]) {
	  case "replace":
		repEnabled = message["content"];
        chrome.storage.sync.set({'replace': message["content"]}, function() {
          console.log('Settings saved');
        });
		console.log("replace with status " + message["content"] + " received");
		break;
    default:
      console.log("idk unknown msg");
	}
  });

var repEnabled = true;
// Read it using the storage API
chrome.storage.sync.get(['replace'], function(items) {
	repEnabled = items["replace"];
});

console.log("Here we go!");
//replaceLinks();
setInterval(replace, 1000);
