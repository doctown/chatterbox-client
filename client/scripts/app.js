//GLOBAL VARIABLES

var app = {
  init: function() {},
  send: function (message) {

    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function () {
    // body...
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'GET',
      dataTye: 'json',
      contentType: 'application/json',
      success: function (data, status) {

        var result = '';

        for (var i = 0; i < data.results.length; i++) {

        //   var user = data.results[i].username;

        //   var $user = $('<div class="chat" id = "' + user + '"></div>');
        //   var msg = $tweet.text('@' + user + ': on   ' + tweet.created_at + '\n'+ tweet.message);
        // msg.html(msg.html().replace(/\n/g,'<br/>'));

          $('#chats').append(data.results[i].text);
        }
        console.log(data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to fetch message', data);
      }
    });

  },

  server: 'https://api.parse.com/1/classes/messages',

  clearMessages: function() {
    $('#chats').empty();
  },
  // Add one message to the DOM under chats
  addMessage: function(message) {
    var username = message.username;
    // Clean messages from XSS attack
    var cleanMessage = htmlEntities(stripTags(message.text));
    // Create a DOM node under chats
    // Create a div for the message with message class
    var $chatMessage = $('<div class="message"></div>');
    // Add the username and message in the div
    // Add bold tag to username
    $chatMessage.append('<strong>' + username + '</strong>:');
    $chatMessage.append('<br />' + cleanMessage);
    // Appende message to chats
    $('#chats').append($chatMessage);
  },
  // Add a room to the list of available rooms on the chat page
  addRoom: function(roomName) {
    // TODO: See if the room name might have XSS vulnerability
    // use jQuery to create an option for the room name 
    // Append the option to #roomSelect
    $('#roomSelect')
    .append($('<option></option>')
    .attr('value', roomName)
    .text(roomName));
  }, 
};

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
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  var commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  return input.replace(commentsAndPhpTags, '')
    .replace(tags, function($0, $1) {
      return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
};


var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};


// fetchData();

