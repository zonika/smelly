'use strict';

const xray = require('x-ray'),
  _ = require('lodash'),
  filters = {
    removeNewlines: (value) => (value.replace(/\n(?=\n)/g, '').replace(/\n/g, '')),
    calcAccordPercentage: (value) => {
      const regex = /width: (\d+)/g,
        width = regex.exec(value);

      if (width && width.length > 1) {
        return Math.floor((parseInt(width[1])/130) * 100);
      }

      return '';
    }
  },
  x = xray({ filters });

x('http://fragrantica.com/p/666',
  'div[itemtype*="Product"]',
  {
    brand: 'p span[itemprop="brand"] span[itemprop="name"]',
    name: 'h1 span[itemprop="name"]',
    photoUrl: 'img[itemprop="image"]@src',
    description: 'div[itemprop="description"] | removeNewlines',
    rating: x('div[itemprop="aggregateRating"]', {
      ratingValue: 'span[itemprop="ratingValue"]',
      bestRating: 'span[itemprop="bestRating"]',
      ratingCount: 'span[itemprop="ratingCount"]'
    }),
    notes: x('div[style*="background-color: #FEF8EA"] p', [['img@alt']]),
    accords: x('div#prettyPhotoGallery', 'div[style*="height: 20px"]', [{
      name: 'span',
      percentMatch: 'div@style | calcAccordPercentage'
    }]),
    group: 'p span[style*="float:right"] span'
  }
)(
  function(err, res) {
    console.log(err);
    const fragrance = res;
    let noteGroup;

    fragrance.rating = `${fragrance.rating.ratingValue}/${fragrance.rating.bestRating} with ${fragrance.rating.ratingCount} votes.`

    if (fragrance.notes.length === 1) {
      fragrance.notes = _.flatten(fragrance.notes);
    }

    console.dir(fragrance, { depth: null, colors: true });
  }
);
