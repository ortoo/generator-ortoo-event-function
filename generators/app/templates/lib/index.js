// If you want to access the pubsub stream you can, using
// var pubsub = require('google-cloud')().pubsub();
// Credentials are taken care of already

// `data` and `attributes` are the data and attibutes from the pub/sub message.
// `message` is the raw message if you need it.
module.exports = function(data, attributes, message) {
  // Do something here...
};
