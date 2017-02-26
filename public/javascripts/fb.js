
/**
 * Created by mypc on 1/19/2017.
 */
var https = require('https');
var _ = require("underscore");

exports.getFbData = function(accessToken, param, apiPath, callback) {
        apiPath = "search?q=volunteer&type=event";
        var options = {
            host: 'graph.facebook.com',
            port: 443,
            path: "/"+ apiPath + param + 'access_token=' + accessToken, //apiPath example: '/me/friends'
            method: 'GET'
        };

        console.log("\n\n options:::", options);
        var buffer = ''; //this buffer will be populated with the chunks of the data received from facebook
        var request = https.get(options, function(result){
            result.setEncoding('utf8');


            result.on('data', function(chunk){
                buffer += chunk;
            });

            result.on('end', function(){
                //console.log(buffer);
                var o = JSON.parse(buffer);
                var eventList = o.data;
               // console.log(o[0]);
                var filtered = _.where(eventList, {timezone: "America/Chicago"});
                 console.log(filtered);
                console.log(filtered.length);
                callback("12");
            });


        request.on('error', function(e){
            console.log('error from facebook.getFbData: ' + e.message)
        });

        request.end();
    });
}
