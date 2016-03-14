// YOUR CODE HERE:

var server = 'https://api.parse.com/1/classes/messages';

var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};

var postData = function() {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
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

};

var fetchData = function() {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
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
  
};

fetchData();

