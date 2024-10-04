async function createOverlay() {
    if(isEnabled){
        const overlay = document.createElement('img');
        overlay.id = 'overlay';
        var number = ('00'+ Math.floor(Math.random() * 370)).substr(-3);
        console.log("number now " + number);
        overlay.src = await chrome.runtime.getURL("images/new/" +  number + ".jpg");
        overlay.style.top = Math.floor(Math.random() * document.body.clientHeight) +"px";
        overlay.style.left = Math.floor(Math.random() * document.body.clientWidth) +"px";
        overlay.addEventListener("click", () => {
            overlay.remove();
          });
        document.body.appendChild(overlay);
        return overlay;
    }
    return null;
   }

function findRandomImageToReplace(){ 
//console.log("call find");
return fetch( "https://danbooru.donmai.us/posts/random" )
    .then(response=>fetch(response.url))
    .then(response => {
    return response.text()
    })
    .then(html => {
        const parser = new DOMParser()

        const doc = parser.parseFromString(html, "text/html")

        var images = doc.getElementsByTagName("img");

        //console.log("what we found " + images[1].src);
        return images[1].src;
    })
}

chrome.runtime.onMessage.addListener((message) => {
	switch (message) {
	  case "on":
		isEnabled = true;
        chrome.storage.local.set({ "spam": true }).then(() => {
            console.log("Value is set");
          });
		console.log("on");
		break;
      case "clear":
        var images = document.querySelectorAll("overlay");
	    for (var i = 0; i < images.length; i++) {
            console.log("try remove");
            images[i].parentNode.removeChild(images[i]);
        }
        console.log("on");
        break;
	  default:
        isEnabled = false;
		chrome.storage.local.set({ "spam": false }).then(() => {
            console.log("Value is set");
          });
		console.log("off");
		break;
	}
	console.log(isEnabled);
  });

isEnabled = false;/*
chrome.storage.local.get(["spam"]).then((result) => {
    console.log("Value is " + result.value);
    isEnabled = result.value;
});*/
console.log("create div");
setInterval(createOverlay, 1000);