# Smelly

a simple REST api that wraps [fragrantica](http://fragrantica.com). it is in active development.

Right now there are only two routes:

**List all notes**
---
  returns a JSON array of all the [notes](https://www.fragrantica.com/notes/) available to search on fragrantica.com, slugified (for easy searching).

* **URL**
  /notes

* **Method**
  `GET`

**Get a note**
---
  returns an instance of a note (if found) including:
  - name of the note
  - a short description (_profile_)
  - the group the note belongs to
  - a list of fragrances that contain this note

  important: (for now) the note slug must exist in the `notes` list

* **URL**
  /notes/:note

* **Method**
  `GET`


## Setup

you'll need to generate a notes list to keep locally. to do this, run `node updateNotes.js`

## Running

set up the server locally by running `npm install` followed by `node api.js`

you should get a response by navigating to `localhost:8008/<any route above>` in your browser of choice.
