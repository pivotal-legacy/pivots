'use strict';

var React = require('react');
var _ = require('lodash');
var Face = require('./Face');

var Directory = React.createClass({
  statics: {
    willTransitionTo: function (transition) {
      if (window.savedJwt === undefined) {
        transition.redirect('/login');
      }
    }
  },
  render: function() {
    var pivots = [
      {
        id: 1,
        name: 'Danny Burkes',
        imageUrl: 'http://pivots.pivotallabs.com.s3.amazonaws.com/uploads/user/photo/36/Danny_Burke-1.jpg',
        title: 'Director',
        manager: 'David Goudreau',
        email: 'dburkes@pivotal.io',
        location: 'Tokyo',
        startDate: 'April 2010'
      },
      {
        id: 2,
        name: 'Jeana Alayaay',
        imageUrl: 'http://pivots.pivotallabs.com.s3.amazonaws.com/uploads/user/photo/1132/IMG_1577.JPG',
        title: 'Product Manager',
        manager: 'Danny Burkes',
        email: 'jalayaay@pivotal.io',
        location: 'Tokyo',
        startDate: 'May 2012'
      },
      {
        id: 3,
        name: 'Yuki Nishijima',
        imageUrl: 'http://pivots.pivotallabs.com.s3.amazonaws.com/uploads/user/photo/669/IMG_7735.jpg',
        title: 'Engineer',
        manager: 'Danny Burkes',
        email: 'ynishijima@pivotal.io',
        location: 'Tokyo',
        startDate: 'October 2013'
      },
      {
        id: 4,
        name: 'Eno Compton',
        imageUrl: 'http://pivots.pivotallabs.com.s3.amazonaws.com/uploads/user/photo/495/IMG_9416.JPG',
        title: 'Engineer',
        manager: 'Danny Burkes',
        email: 'ecompton@pivotal.io',
        location: 'Tokyo',
        startDate: 'May 2013'
      },
      {
        id: 5,
        name: 'Hee Won Choi',
        imageUrl: 'http://pivots.pivotallabs.com.s3.amazonaws.com/uploads/user/photo/808/pivots-image20131230-19368-3diu8r',
        title: 'Design Manager',
        manager: 'Danny Burkes',
        email: 'hchoi@pivotal.io',
        location: 'Tokyo',
        startDate: 'February 2012'
      },
      {
        id: 6,
        name: 'Whitney Schaefer',
        imageUrl: 'http://pivots.pivotallabs.com.s3.amazonaws.com/uploads/user/photo/333/IMG_9121.JPG',
        title: 'Engineering Manager',
        manager: 'Danny Burkes',
        email: 'wschaefer@pivotal.io',
        location: 'Tokyo',
        startDate: 'May 2012'
      }
    ];

    var pivotFaces = _.map(pivots, function(pivot) {
      return (
        <Face key={pivot.id} pivot={pivot} />
      );
    });

    return (
      <div className='container'>
        {pivotFaces}
      </div>
    );
  }
});

module.exports = Directory;