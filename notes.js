'use strict';

const xray = require('x-ray'),
  _ = require('lodash'),
  fs = require('fs'),
  notes = require('./notesList.json'),
  filters = {
    sanitizeNoteName: (value) => value.toLowerCase().replace(/\s/g, '-').replace(/\W-/g, '')
  },
  x = xray({ filters });

function updateNotes() {
  x('https://www.fragrantica.com/notes/', 'div#col1 div.notebox', [{ name: 'a | sanitizeNoteName', url: 'a@href'}])(
    function (err, res) {
      fs.writeFile('notesList.json', JSON.stringify(res), 'utf8', () => console.log('notesList.json written successfully!'));
    }
  );
}

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

//updateNotes();
module.exports.searchByNote = searchByNote;
