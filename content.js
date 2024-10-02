async function createOverlay() {
    const overlay = document.createElement('img');
    overlay.id = 'overlay';
    overlay.src = chrome.runtime.getURL("images/" +  Math.floor(Math.random() * 74) + ".jpg");
    overlay.style.top = Math.floor(Math.random() * document.body.clientHeight) +"px";
    overlay.style.left = Math.floor(Math.random() * document.body.clientWidth) +"px";
    overlay.addEventListener("click", () => {
        overlay.remove();
      });
    document.body.appendChild(overlay);
    return overlay;
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

async function replace() {
	console.log("call replace");
	var images = document.querySelectorAll("img");
	for (var i = 0; i < images.length; i++) {
			if (images[i].id == 'overlay'){
                var img = chrome.runtime.getURL("images/" +  Math.floor(Math.random() * 74) + ".jpg")
                console.log("found " + img);
				images[i].src = img;
			}
	}
}

console.log("create div");
var ov = createOverlay();
setInterval(createOverlay, 1000);