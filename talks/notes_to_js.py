#!/usr/bin/env python3
"""Turn Keynote presenter notes into a talks.js entry.

Reads the delimited notes file written by import-keynote.sh and prints a
JavaScript object literal to paste into the window.TALKS array.
"""
import json
import os
import re
import sys


CUE = re.compile(r"\[[A-Z][A-Z ]*\]")


def strip_cues(text):
    """Drop stage directions like [KLICK] or [DRAMATIC PAUSE].

    They cue the live delivery of the talk and are noise when the notes are
    read on their own. Whitespace left behind by a removed cue is collapsed.
    """
    text = CUE.sub("", text)
    lines = (re.sub(r"[ \t]{2,}", " ", ln).strip() for ln in text.split("\n"))
    return "\n".join(lines).strip()


def main():
    if len(sys.argv) != 2:
        sys.exit("usage: notes_to_js.py <notes.txt>")

    slug = os.environ.get("SLUG", "my-talk")
    with open(sys.argv[1], encoding="utf-8") as fh:
        raw = fh.read()

    parts = re.split(r"@@@SLIDE (\d+)@@@\n", raw)
    entries = [
        (int(parts[i]), strip_cues(parts[i + 1]))
        for i in range(1, len(parts), 2)
    ]
    entries.sort()

    lines = ",\n".join(
        "            { n: %d, notes: %s }" % (n, json.dumps(b, ensure_ascii=False))
        for n, b in entries
    )
    print(
        "    {\n"
        '        id: "%s",\n'
        '        title: "TODO",\n'
        '        event: "TODO",\n'
        '        context: "TODO",\n'
        '        date: "TODO",\n'
        '        dir: "talks/%s/slides",\n'
        '        ext: "jpg",\n'
        "        pad: 2,\n"
        "        slides: [\n%s\n        ],\n"
        "    }," % (slug, slug, lines)
    )


if __name__ == "__main__":
    main()
