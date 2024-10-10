async function createOverlay() {
    if(spEnabled){
        const overlay = document.createElement('img');
        overlay.id = 'overlay';
        overlay.style.position = 'absolute';
        var number = ('00'+ Math.floor(Math.random() * 370)).substr(-3);
        overlay.src = await chrome.runtime.getURL('images/new/' +  number + '.jpg');
        overlay.style.top = Math.floor(Math.random() * (document.body.scrollHeight)) + document.documentElement.scrollTop +"px";
        overlay.style.left = Math.floor(Math.random() * document.body.clientWidth) +"px";
        overlay.addEventListener("click", () => {
            overlay.remove();
          });
        document.body.appendChild(overlay);
        return overlay;
    }
    return null;
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
      frequency = message["content"]*1000;
      chrome.storage.sync.set({'popslider': message["content"]}, function() {
        console.log('Settings saved freq ' + message["content"]);
      });
      clearInterval(interval);
      interval = setInterval(createOverlay, frequency);
		console.log("frequency with speed " + message["content"] + " received");
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

chrome.storage.sync.get(['popslider'], function(items) {
  frequency = (items["popslider"]*1000);
  console.log("restored popslider with " + items["popslider"]);
  clearInterval(interval);
  interval = setInterval(createOverlay, frequency);
});

console.log("create div freq " + frequency);


var interval = setInterval(createOverlay, frequency);