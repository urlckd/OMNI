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
	  case "spam":
      spEnabled = message["content"];
        chrome.storage.sync.set({'spam': message["content"]}, function() {
          console.log('Settings saved');
        });
		console.log("spam with status " + message["content"] + " received");
		break;
    case "frequency":
      frequency = message["content"]*1000;
      chrome.storage.sync.set({'freq': frequency}, function() {
        console.log('Settings saved freq ' + frequency);
      });
      clearInterval(interval);
      interval = setInterval(createOverlay, frequency);
		console.log("frequency with speed " + message["content"] + " received");
		break;
    default:
      console.log("idk unknown msg");
	}
  });

var spEnabled = false;
var frequency = 4000;
// Read it using the storage API
chrome.storage.sync.get(['spam'], function(items) {
  spEnabled = items["spam"];
});

chrome.storage.sync.get(['freq'], function(items) {
  frequency = items["freq"];
  clearInterval(interval);
  interval = setInterval(createOverlay, frequency);
});

console.log("create div freq " + frequency);
var interval = setInterval(createOverlay, frequency);