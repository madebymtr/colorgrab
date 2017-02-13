// Update the relevant fields with the new data
function setDOMInfo(info) {
  // loop through our colors, create the palette.
  info.colorkeys.forEach(function(key){
    $('#colors').append("<div class='color' style='background-color:"+key+"'><span>"+key+"</span></div>");
  });
}

window.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        setDOMInfo);
  });
});