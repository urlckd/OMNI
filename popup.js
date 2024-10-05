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

  document.getElementById("freqsave").onclick = () => {
    send("frequency", document.getElementById('freq').value);
  }

  chrome.storage.sync.get(['spam','replace', 'freq'], function(items) {
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
  });