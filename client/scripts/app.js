$(document).ready(function() {
  var username = 'anonymous';
  // Handle events from clicking username
  $('#chats').on('click', '.username', function () {
    app.addFriend($(this).text());
  });

  // Handle events from submit button and adds text to page
  $('#send').submit( function(e) {
    e.preventDefault();
    // Create a message
    var message = {
      username: username,
      text: $(this).find('#message').val(),
      roomname: 'temp'// get current room name
    };
    app.handleSubmit(message);
  });

  $('#user').on('click', 'button', function() {
    username = $(this).siblings('#user-input').val();
  });
});

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
        for (var i = 0; i < data.results.length; i++) {
          app.addMessage(data.results[i]);
        }
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
    var $chatMessage = $('<div class="chat-message"></div>');
    // Add the username and message in the div
    // Add bold tag to username
    $chatMessage.append('<span class="username ' + username + '">' + username + '</span>:'); 
    //check if userName is in friend list
    //if in list, add friend Class to message  
    if (app.friends.indexOf(username) !== -1) {
      $chatMessage.append('<span class="message friend ' + username + '"> <br />' + cleanMessage + '</span>');
    } else {
      $chatMessage.append('<span class="message ' + username + '"> <br />' + cleanMessage + '</span>');
    }
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

  //adds a friend class to all friends messages
  addFriend: function(friendName) {

    //add friend to friend array.
    app.friends.push(friendName);
    //find all friend's messages and add friend Class

    $('.' + friendName + '.message').addClass('friend');
  },

  friends: [],
  // Add message to the chat room
  handleSubmit: function(message) {
    // app.send(message);
    //app.addMessage(message);
    // Send message to the server
    app.send(message);
    // TODO: Sanitize text before sending to server
  }
};

// HELPER FUNCTIONS
// Strips html from a text and replace it with generic html to be rendered as text
// Help protect against XSS attacks
var htmlEntities = function (str) {
  if (str === undefined) {
    return;
  }

  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

// Strips HTML tags from text
// Credits: https://github.com/kvz/phpjs/blob/master/functions/strings/strip_tags.js
var stripTags = function(input, allowed) {
  if (input === undefined) {
    return;
  }

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

//create a function to automate messages
var automateMessages = function() {
  //clear messages
  //invoke app.fetch - > fetch messages from server
  app.clearMessages();
  app.fetch();
};

automateMessages();
setInterval(automateMessages, 10000);