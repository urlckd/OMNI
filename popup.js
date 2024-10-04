const send = (s) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, s);
    });
  }
  
  document.getElementById("on").onclick = () => {
    send("on");
  }
  
  document.getElementById("off").onclick = () => {
    send("off");
  }