var keys = require('./config/panda-config.js');
var express = require('express');
var app = require('./server.js')
var instagram = require('instagram-node-lib');
var fs = require('fs');

instagram.set('client_id', keys.instagram.client_id);
instagram.set('client_secret', keys.instagram.client_secret);

exports.getRestaurants = function (restaurants){
  console.log('fetching ', restaurants.length, 'restaurants from Yelp');
  for (var i=0; i<restaurants.length; i++){
    // check instagram for every restaurant (provide name + coordinates)
    // console.log(restaurants[i].name);
    var resName = restaurants[i].name;
    myStr=resName.replace(/\s+/g, "+");
    myStr=myStr.split('+');
    // escape single quotes in the name
    //resName = resName.replace(/'/g, "\\'");
    var name = [];
    name.push(myStr);
    // console.log(name[0])
    checkInstagram(name);
  }
 
}
var checkInstagram = function (name){
  //console.log('searching for restaurant called ', name[0][0])
  // currently only searching for one word names
  // to search for two worded names: name : 'Saigon'+'Sandwich'
  instagram.tags.recent({ name: name[0][0], 
    complete: function(data){
      //console.log(data);
    },
  });
};


//  the stuff below will work if yelp provided coordinates
//  // calling 'instagram.tags.recent' using a restaurant name i.e. name: 'sushirrito', will fetch
//  // objects with tags using this name
//  instagram.tags.recent({ name: 'sushirrito', 
//   complete: function(data){
//    var latitude = Math.ceil(data[1].location.latitude);
//    console.log(latitude);
//    var count = 0;
//    var url;
//     // iterate through the data array and check if coordinates are the same as yelp cors
//     for ( var i=0 ; i<data.length; i++){
//       if (data[i].location){
//         if (Math.ceil(data[i].location.latitude) === latitude){
//           console.log('found');
//           if (count === 0){
//             url = data[i].link;
//           }
//           count++;
//         } else {
//           console.log(data[i].location)
//         }
//       }


//     }
//     console.log('found ',count);
//     // fetch the count and url
//   }
// });
