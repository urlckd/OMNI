const send = (s) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, s);
    });
  }
  
  document.getElementById("spam").onclick = () => {
    var button = document.getElementById('spam');
    if (button.textContent == "Active"){
      send("offsp");
      button.textContent = 'Inactive';
    } else{
      send("onsp");
      button.textContent = 'Active';
    }
  }

  document.getElementById("replace").onclick = () => {
    var button = document.getElementById('replace');
    if (button.textContent == "Active"){
      send("offrep");
      button.textContent = 'Inactive';
    } else{
      send("onrep");
      button.textContent = 'Active';
    }
  }

  chrome.storage.sync.get(['spam','replace'], function(items) {
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
  });