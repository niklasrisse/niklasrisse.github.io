#!/bin/bash
#
# Import a Keynote deck into the slide viewer: exports the slides as JPEGs
# and the presenter notes as a ready-to-paste entry for talks/talks.js.
#
#   ./talks/import-keynote.sh <deck.key> <slug>
#
# Example:
#   ./talks/import-keynote.sh ~/Desktop/ase-2026.key ase-2026
#
# Afterwards, append the printed object to the window.TALKS array in
# talks/talks.js and fill in title / event / context / date.
#
# Requires macOS with Keynote installed. Keynote opens a *copy* of the deck,
# so the original file is never modified.

set -euo pipefail

if [ $# -ne 2 ]; then
    echo "usage: $0 <deck.key> <slug>" >&2
    exit 1
fi

DECK="$1"
SLUG="$2"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/talks/$SLUG/slides"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

if [ ! -e "$DECK" ]; then
    echo "error: no such deck: $DECK" >&2
    exit 1
fi
if [ -e "$ROOT/talks/$SLUG" ]; then
    echo "error: talks/$SLUG already exists — pick another slug" >&2
    exit 1
fi

cp -R "$DECK" "$WORK/deck.key"

echo "Opening Keynote and reading presenter notes…"
osascript <<APPLESCRIPT > "$WORK/notes.txt"
tell application "Keynote"
	activate
	set theDoc to open POSIX file "$WORK/deck.key"
	delay 2
	set out to ""
	tell theDoc
		repeat with i from 1 to (count of slides)
			set out to out & "@@@SLIDE " & i & "@@@" & linefeed & ¬
				(presenter notes of slide i) & linefeed
		end repeat
	end tell
	export theDoc to file ((POSIX file "$WORK/slides") as string) ¬
		as slide images with properties {image format:JPEG, ¬
		compression factor:0.85, skipped slides:false, all stages:false}
	close theDoc saving no
	return out
end tell
APPLESCRIPT

echo "Copying and downscaling slide images…"
mkdir -p "$DEST"
i=0
for f in "$WORK"/slides/*.jpeg; do
    i=$((i + 1))
    cp "$f" "$DEST/$(printf '%02d' $i).jpg"
done
sips -Z 1600 -s formatOptions 78 "$DEST"/*.jpg > /dev/null 2>&1

echo "Exported $i slides to talks/$SLUG/slides"
echo
echo "Add this to the window.TALKS array in talks/talks.js:"
echo "------------------------------------------------------------"
SLUG="$SLUG" python3 "$ROOT/talks/notes_to_js.py" "$WORK/notes.txt"
echo "------------------------------------------------------------"
