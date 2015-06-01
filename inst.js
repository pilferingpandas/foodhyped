var keys = require('./config/panda-config.js');
var express = require('express');
var app = require('./server.js')
var instagram = require('instagram-node-lib');
var fs = require('fs');

instagram.set('client_id', keys.instagram.client_id);
instagram.set('client_secret', keys.instagram.client_secret);

exports.getRestaurants = function (restaurant){
  console.log('fetching', restaurant)}
 // fetch a list from yelp with names and coordinates

 // calling 'instagram.tags.recent' using a restaurant name i.e. name: 'sushirrito', will fetch
 // objects with tags using this name
 instagram.tags.recent({ name: 'sushirrito', 
  complete: function(data){
   var latitude = Math.ceil(data[1].location.latitude);
   console.log(latitude);
   var count = 0;
   var url;
    // iterate through the data array and check if coordinates are the same as yelp cors
    for ( var i=0 ; i<data.length; i++){
      if (data[i].location){
        if (Math.ceil(data[i].location.latitude) === latitude){
          console.log('found');
          if (count === 0){
            url = data[i].link;
          }
          count++;
        } else {
          console.log(data[i].location)
        }
      }

      
    }
    console.log('found ',count);
    // fetch the count and url
  }
});
