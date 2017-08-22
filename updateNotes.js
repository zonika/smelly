'use strict';

const xray = require('x-ray'),
  fs = require('fs'),
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

updateNotes();
