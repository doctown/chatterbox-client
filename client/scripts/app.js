// Variables


var app = {
  init: function() {

  }, // initialize connection
  send: function (message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent', data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  }, // send info to server
  fetch: function() {
    $.ajax({
      url: parseServerURL,
      contentType:'application/json',
      type: 'GET',
      success: function(data) {
        var cleanedData = htmlEntities(strip_tags(data));
        console.log(cleanedData);
      },
      dataType: 'application/json'
    });
    $.get(parseServerURL, function(data) {
      console.log(data);
    });
  }, // get data from server
  server: 'https://api.parse.com/1/classes/messages'
};
// Display messages retrieved from  parse server

// Create an object

// Make ajax request to get existing data


// Display that data in chatterbox
  // Strip the data through htmlEntities and strip_tags


// POSTING A MESSAGE TO THE SERVER
// Example from bookstrap
var sampleMessage = {
  username: 'bobby mitchell',
  text: 'This is my sample message',
  roomname: 'test-room'
};

/*
$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: parseServerURL,
  type: 'POST',
  data: JSON.stringify(sampleMessage),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});

*/

// HELPER FUNCTIONS
// Strips html from a text and replace it with generic html to be rendered as text
// Help protect against XSS attacks
var htmlEntities = function (str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};


// Strips HTML tags from text
// Credits: https://github.com/kvz/phpjs/blob/master/functions/strings/strip_tags.js
var stripTags = function(input, allowed) {
  allowed = (((allowed || '') + '')
    .toLowerCase()
    .match(/<[a-z][a-z0-9]*>/g) || [])
    .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
    commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  return input.replace(commentsAndPhpTags, '')
    .replace(tags, function($0, $1) {
      return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
};