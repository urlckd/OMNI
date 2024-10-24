async function createOverlay() {
    if(spEnabled){
        const overlay = document.createElement('img');
        overlay.id = 'overlay';
        overlay.style.position = 'absolute';
        if(censorEnabled){
          const response = await fetch(chrome.runtime.getURL('images/custom/customPack.txt'));
          const data = await response.text();
          // Split the file content by newlines to create an array
          var imageNames = data.split('\n');
        }else{
          file = '2d/' + (Math.floor(Math.random() * 74) + '.jpg');
        }
        if(censorEnabled){
          overlay.src = await chrome.runtime.getURL('images/' + 'custom/' + imageNames[Math.floor(Math.random() * imageNames.length)]);
        }else{
          overlay.src = await chrome.runtime.getURL('images/' + '2d/' + (Math.floor(Math.random() * 74) + '.jpg'));
        }
        console.log("site height " +document.body.scrollHeight+"px");
        console.log("position " + Math.floor(Math.random() * 100) + document.documentElement.scrollTop+"px");
        overlay.style.top = Math.floor(Math.random() * 1080) + document.documentElement.scrollTop+"px";
        overlay.style.left = Math.floor(Math.random() * document.body.clientWidth) +"px";
        overlay.addEventListener("click", () => {
            overlay.remove();
          });
        document.body.appendChild(overlay);
        return overlay;
    }
    return null;
   }

var levels ={
  '1':'3', 
  '2':'2', 
  '3':'1',
  '4':'0.5'
}

chrome.runtime.onMessage.addListener((message) => {
	switch (message["type"]) {
	  case "popup":
      console.log("popup with " +  message["content"]);
      spEnabled = message["content"];
        chrome.storage.sync.set({'popup': message["content"]}, function() {
          console.log("popup with " +  message["content"]);
        });
		console.log("spam with status " + message["content"] + " received");
		break;
    case "popslider":
      console.log("popslider with " +  message["content"]);
      frequency = levels[message["content"]]*1000;
      chrome.storage.sync.set({'popslider': message["content"]}, function() {
        console.log('Settings saved freq ' + message["content"]);
      });
      clearInterval(interval);
      interval = setInterval(createOverlay, frequency);
		console.log("frequency with speed " + message["content"] + " received");
		break;
    case "clean":
      var imgs = document.querySelectorAll('img[id="overlay"]');
			for (var i = 0; i < imgs.length; i++) {
        imgs[i].remove();
			}
		break;
    default:
	}
  });

var spEnabled = false;
var frequency = 4000;
// Read it using the storage API
chrome.storage.sync.get(['popup'], function(items) {
  spEnabled = items["popup"];
  console.log("restored popup with " + spEnabled);
});

chrome.storage.sync.get(['censor'], function(items) {
	censorEnabled = items["censor"];
	console.log("restored censor with " + repEnabled);
});

chrome.storage.sync.get(['popslider'], function(items) {
  frequency = (levels[items["popslider"]]*1000);
  console.log("restored popslider with " + items["popslider"]);
  clearInterval(interval);
  interval = setInterval(createOverlay, frequency);
});

console.log("create div freq " + frequency);


var interval = setInterval(createOverlay, frequency);
