async function createOverlay() {
    if(isEnabled){
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
	switch (message) {
	  case "on":
		isEnabled = true;
        chrome.storage.sync.set({'spam': true}, function() {
          console.log('Settings saved');
        });
		console.log("on");
		break;
	  default:
        isEnabled = false;
        chrome.storage.sync.set({'spam': false}, function() {
          console.log('Settings saved');
        });
		console.log("off");
		break;
	}
	console.log(isEnabled);
  });

isEnabled = false;
// Read it using the storage API
chrome.storage.sync.get(['spam'], function(items) {
  isEnabled = items["spam"];
});
console.log("create div");
setInterval(createOverlay, 1000);