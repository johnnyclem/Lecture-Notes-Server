// Server-side Code

// Define actions which can be called from the client using ss.rpc('demo.ACTIONNAME', param1, param2...)
exports.actions = function(req, res, ss) {

  // Example of pre-loading sessions into req.session using internal middleware
  req.use('session');

  // Uncomment line below to use the middleware defined in server/middleware/example
  //req.use('example.authenticated')

  return {

    sendMessage: function(message, led) {
      if (message && message.length > 0) {         // Check for blank messages
				if (led && led == "red") {
	        ss.publish.all('newMessage', message, 'newLed', led);     // Broadcast the message to everyone					
				} else if (led && led == "green") {
	        ss.publish.all('newMessage', message, 'newLed', led);     // Broadcast the message to everyone					
				} else {
	        ss.publish.all('newMessage', message, 'newLed', 'amber');     // Broadcast the message to everyone					
				}
        return res(true);                          // Confirm it was sent to the originating client
      } else {
        return res(false);
      }
    }

  };

};