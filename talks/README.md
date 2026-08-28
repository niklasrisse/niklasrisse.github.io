# Talks

Slide decks shown by the viewer at `slides.html`.

```
talks/
  talks.js                     data for every talk (window.TALKS)
  <slug>/slides/01.jpg …       one image per slide
  import-keynote.sh            Keynote -> images + notes
  notes_to_js.py               helper used by the import script
```

The viewer is opened as `slides.html?talk=<slug>`; `&slide=<n>` deep-links a
single slide. With more than one talk in `talks.js`, a picker appears in the
header automatically.

## Adding a talk

From a Keynote deck (macOS, Keynote installed):

```sh
./talks/import-keynote.sh ~/Desktop/my-deck.key my-talk-2027
```

This exports the slides to `talks/my-talk-2027/slides/` and prints a
`talks.js` entry with the presenter notes already filled in. Paste it into the
`window.TALKS` array in `talks.js` and replace the `TODO` fields:

| field     | meaning                                                   |
| --------- | --------------------------------------------------------- |
| `id`      | URL slug — `slides.html?talk=<id>`                        |
| `title`   | deck title, shown as the heading                          |
| `event`   | what the talk was, shown above the title                  |
| `context` | where / for whom (optional)                               |
| `date`    | human-readable date (optional)                            |
| `dir`     | folder with the slide images, no trailing slash           |
| `ext`     | image extension (`jpg`)                                   |
| `pad`     | zero-padding of the filenames (`01.jpg` → `2`)            |
| `slides`  | `[{ n: <slide number>, notes: "<presenter notes>" }]`     |

Newest talk first — the viewer defaults to the first entry in the array.

Finally, link it from `index.html` (Talks section) the way the doctoral
defense is linked.

## Other slide sources

The viewer only needs numbered images plus a `slides` array, so a deck from
anywhere works. For a PDF:

```sh
mkdir -p talks/my-talk-2027/slides
magick -density 150 deck.pdf -resize 1600x -quality 78 \
    talks/my-talk-2027/slides/%02d.jpg
```

Then write the `slides` entries by hand (`notes` may be an empty string —
the viewer shows "No notes for this slide.").

## Notes formatting

Notes are plain text; blank lines become paragraphs. The import strips
all-caps stage directions such as `[KLICK]` or `[DRAMATIC PAUSE]`, which are
delivery cues for the live talk and mean nothing to a reader.
