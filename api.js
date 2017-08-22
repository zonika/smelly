const app = require('express')(),
  _ = require('lodash'),
  notes = require('./notes'),
  allNotes = require('./notesList');

app.get('/notes/:note', (req, res) => {
  const note = req.params.note;
  const noteStream = notes.searchByNote(note);

  if (noteStream) {
    res.type('json');
    noteStream.pipe(res);
  } else {
    res.send(`no results for note ${note} :(`);
  }
});

app.get('/notes', (req, res) => {
  res.type('json');
  res.send(_.map(allNotes, (note) => note.name));
});

app.listen(8008, () => ( console.log('listening!') ));
