'use strict';

const x = require('x-ray')(),
  _ = require('lodash'),
  notes = require('./notesList.json');


function searchByNote(noteQuery) {
  const note = _.find(notes, ['name', noteQuery]);

  if (note) {
    return x(note.url, '#col1wrap', {
      name: 'h1',
      group: 'h3 b',
      profile: 'div.myrbroundbox',
      hits: x('#col1 a', [{
        url: '@href',
        hit: '@text'
      }])
    }).stream();
  } else {
    console.log(`No results for note ${noteQuery} :(`);
  }
}

module.exports.searchByNote = searchByNote;
