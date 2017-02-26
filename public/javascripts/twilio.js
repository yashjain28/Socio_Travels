/**
 * Created by mypc on 2/25/2017.
 */
//var accountSid = 'AC8fad4a891110cfc1d348c2c1d7a25b5e';
//var authToken = 'e9eb0648fa7855e652b5806d6bb6c787';
//var twilio = require('twilio');

//var client = new twilio.RestClient(accountSid, authToken);
var Bandwidth = require("node-bandwidth");
var client = new Bandwidth({
    userId    : "u-7yzqqs547oitbxp43nzfthy", // <-- note, this is not the same as the username you used to login to the portal
    apiToken  : "t-oqsjywvptgsuh57c6w5k6vi",
    apiSecret : "xk2pq7shneqes7v6bgjkdpugnt4hk6xzc34trcy"
});
/*exports.sendMsg = function(callback){
    client.messages.create({
        to: "+14846496586",
        from: "+15017250604",
        body: "A new person has registered for the event. Please see the link for more info.",
        mediaUrl: "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
    }, function (err, msg) {
        if(err)
            throw err;
        callback();
    });
}*/

exports.sendMsg2 = function(callback){
    client.Message.send({
        from : "+19047120118", // This must be a number on your account
        to   : "+14846496586",
        text : "Hello world."
    }, function(err, message) {
        if (err) {
            console.log(err);
            throw err;
        }
            callback();
        //console.log("Message sent with ID " + message.id);
    });
}