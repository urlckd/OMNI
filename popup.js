const send = (msgType, msgContent) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {type: msgType, content: msgContent});
    });
  }
  
  document.getElementById("spam").onclick = () => {
    var button = document.getElementById('spam');
    if (button.textContent == "Active"){
      send("spam", false);
      button.textContent = 'Inactive';
    } else{
      send("spam", true);
      button.textContent = 'Active';
    }
  }

  document.getElementById("replace").onclick = () => {
    var button = document.getElementById('replace');
    if (button.textContent == "Active"){
      send("replace", false);
      button.textContent = 'Inactive';
    } else{
      send("replace", true);
      button.textContent = 'Active';
    }
  }

  document.getElementById("rlrsave").onclick = () => {
      send("rlrsave", slider.value);
  }

  document.getElementById("freqsave").onclick = () => {
    send("frequency", document.getElementById('freq').value);
  }

  chrome.storage.sync.get(['spam','replace', 'freq', 'link'], function(items) {
    if (items["spam"]){
      document.getElementById('spam').textContent = 'Active';
    } else {
      document.getElementById('spam').textContent = 'Inactive';
    }
    if (items["replace"]){
      document.getElementById('replace').textContent = 'Active';
    } else {
      document.getElementById('replace').textContent = 'Inactive';
    }
    document.getElementById('freq').value = (items["freq"]/1000);
    try {
      document.getElementById('rlrslider').value = items["link"];
      document.getElementById('rlrchance').value = items["link"];
    } catch (error) {
      document.getElementById('rlrslider').value = 2;
      document.getElementById('rlrchance').value = 2;
    }
  });

var slider = document.getElementById("rlrslider");
var output = document.getElementById("rlrchance");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = ('  '+ this.value).substr(-3);
}