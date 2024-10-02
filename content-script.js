async function replace() {
	console.log("call replace");
	var images = document.querySelectorAll("img");
	for (var i = 0; i < images.length; i++) {
			if (images[i].id != 'overlay'){
				images[i].src = chrome.runtime.getURL("images/" +  Math.floor(Math.random() * 74) + ".jpg");
			}
	}
}

console.log("Here we go!");
setInterval(replace, 1000);