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

/*chrome.runtime.onMessage.addListener((message) => {
	switch (message) {
		case "onrep":
			repEnabled = true;
			chrome.storage.sync.set({'replace': true}, function() {
				console.log('Settings saved');
			});
			console.log("onrep");
			break;
			case "offrep":
			repEnabled = false;
			chrome.storage.sync.set({'replace': false}, function() {
				console.log('Settings saved');
			});
			console.log("offrep");
			break;
    default:
      console.log("idk unknown msg");
	}
	console.log(repEnabled);
  });*/

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
setInterval(replace, 1000);