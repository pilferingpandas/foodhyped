var yelpKey = {
 consumer_key: '5Sq5f8xENeanElUxNQogIA',
 consumer_secret: '8pNgr5EirL64rxeVbKW5ezK2rDs',
 token: 'LlUyfgNoFVSOBeJ3Y9fnKX-xdxdlFjgj',
 token_secret:  'iZg5iZFCDJviFtuDRBf_gje4bMw',
 ssl: true
};

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/client'));


var yelp = require("yelp").createClient({
  consumer_key: yelpKey.consumer_key,
  consumer_secret: yelpKey.consumer_secret,
  token: yelpKey.token,
  token_secret: yelpKey.token_secret
});

var returnNum = 10;
var allBizs;

var handleBizs = function(res) {

  // once we have all details about bizs in the area,
  // we want to do something with them all (send back to client)

  var output = [];

  for (var t = 0; t < allBizs.length; t++) {
    var currentBiz = allBizs[t];
    output.push('<img src="' + currentBiz.image_url + '"><br>' + currentBiz.name + ' (' + currentBiz.id + ', ' + currentBiz.address + '): ' + currentBiz.rating + '/' + currentBiz.reviewCount + '<br>');
  }

  res.send(output.join());

}

app.get('/yelpresults.html', function(req, res) {

  console.log('rofl');

  // search san francisco for all food restaurants
  yelp.search({term: "food", location: "San Francisco", limit: returnNum}, function(error, data) {
    if (!error) {

      allBizs = [];

      var biz = data.businesses;

      for (var i = 0; i < biz.length; i++) {


      //  console.log('yelp id for restaurant #' + i + '- ' + biz[i].name + ': ' + biz[i].id);
        // once we have a list of restaurants we want to make yelp api requests for each restaurant individually to get more info
        yelp.business( biz[i].id, function(error, business) {

          allBizs.push({
            name: business.name,
            id: business.id,
            address: business.location.address,
            reviewCount: business.review_count,
            rating: business.rating,
            image_url: business.image_url
          });

          if (allBizs.length === biz.length) {
            // if allBizs have been pushed to our allBizs array (saved all details to allBizs array)
            handleBizs(res);
          }

        });
      }


    } else {
      console.log('error!');
    }
  });


});


var port = 3000;
app.listen(port);

console.log('Express server started on port %s', port);
