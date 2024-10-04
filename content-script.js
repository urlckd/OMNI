async function replace() {
	var images = document.querySelectorAll("img");
	for (var i = 0; i < images.length; i++) {
			if (images[i].id != 'overlay'){
				var number = Math.floor(Math.random() * 74);
				images[i].src = await chrome.runtime.getURL('images/' +  number + '.jpg');
			}
	}
}

console.log("Here we go!");
setInterval(replace, 1000);