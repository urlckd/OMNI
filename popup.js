function toggleActive(name) {
  var element = document.getElementById(name);
  element.classList.toggle('active');
}

const send = (msgType, msgContent) => {
  try{
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {type: msgType, content: msgContent});
  });
  }catch{}
}

var rlrslider = document.getElementById("rlrslider");
var rlroutput = document.getElementById("rlrchance");
var popslider = document.getElementById("popslider");
var popoutput = document.getElementById("poplevel");
var togglePopup = document .getElementById("popup");
var toggleSwapper = document .getElementById("swapper");
var toggleUrlChange = document .getElementById("urlChange");
var toggleCensor = document .getElementById("censor");
document.getElementById("popup").addEventListener('click', () => {toggleActive('popup');});
document.getElementById("swapper").addEventListener('click', () => {toggleActive('swapper');});
document.getElementById("urlChange").addEventListener('click', () => {toggleActive('urlChange');});
document.getElementById("censor").addEventListener('click', () => {toggleActive('censor');});
document.getElementById("save").addEventListener('click', () => {save();});
document.getElementById("clean").addEventListener('click', () => {clean();});

try{
chrome.storage.sync.get(['popup','censor', 'swapper', 'urlChange', 'popslider', 'rlrslider'], function(items) {
  try{
      if (items["popup"]){
          document.getElementById("popup").classList.toggle('active');
      }
  }catch(error){}
  if(items["popslider"] == undefined){
    document.getElementById("poplevel").innerHTML = "level 4";
    document.getElementById("popslider").value = 4;
  }else{
    document.getElementById("poplevel").innerHTML = "level " + items["popslider"];
    document.getElementById("popslider").value = items["popslider"];
  }
  try{
      if (items["censor"]){
          document.getElementById("censor").classList.toggle('active');
      }
  }catch(error){}
  try{
      if (items["swapper"]){
          document.getElementById("swapper").classList.toggle('active');
      }
  }catch(error){}
  try{
      if (items["urlChange"]){
          document.getElementById("urlChange").classList.toggle('active');
      }
  }catch(error){}
  if(items["rlrslider"] == undefined){
    document.getElementById("rlrchance").innerHTML = "2%";
    document.getElementById("rlrslider").value = 2;
  }else{
    document.getElementById("rlrchance").innerHTML = items["rlrslider"] + "%";
    document.getElementById("rlrslider").value = items["rlrslider"];
  }
});
}catch{}

function getToggleStatus(element){
  if(element.classList.value != 'toggle'){
    return true;
  }else{
    return false;
  }
}

function save(){
  try{
  send("popup", getToggleStatus(togglePopup));
  send("swapper", getToggleStatus(toggleSwapper));
  send("urlChange", getToggleStatus(toggleUrlChange));
  send("censor", getToggleStatus(toggleCensor));
  send("popslider", popslider.value);
  send("rlrslider", rlrslider.value);
  }catch{};
}

function clean(){
  try{
  send("clean", "crabo");
  }catch{};
}


rlrslider.oninput = function() {
  rlroutput.innerHTML = ('  '+ this.value).substr(-3)+'%';
}

rlroutput.innerHTML = rlrslider.value+"%"; // Display the default slider value

popslider.oninput = function() {
  popoutput.innerHTML = "level "+('  '+ this.value).substr(-3);
}

popoutput.innerHTML = "level " + popslider.value; // Display the default slider value
