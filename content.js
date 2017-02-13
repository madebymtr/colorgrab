chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});

// event listener 
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    // query the dom, get every element
    var nodes = document.querySelectorAll("*");
    // store our colors in an array
    var colors = [];

// Cycle through each element in the DOM, grab the color codes.
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      
      // element background colors
      var background = window.getComputedStyle(node)['background-color'];
      // element texxt colors
      var textcolor = window.getComputedStyle(node)['color'];
      colors.push(background);
      colors.push(textcolor);
    }

// filter out repeat values, no need to have 100 of the same color.
    colors = colors.filter(function(elem, index, self) {
      return index == self.indexOf(elem);
    });

// create our response object
    var domInfo = {
      colorkeys: colors
    };

// send it back
    response(domInfo);
  }
});