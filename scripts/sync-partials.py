#!/usr/bin/env python3
"""Copy the shared header/footer from _partials/ into every page.

The site has no build step, so each page carries its own copy of the nav
and footer between marker comments:

    <!-- header:start --> ... <!-- header:end -->
    <!-- footer:start --> ... <!-- footer:end -->

Edit _partials/header.html or _partials/footer.html, then run:

    python3 scripts/sync-partials.py          # rewrite pages
    python3 scripts/sync-partials.py --check  # exit 1 if any page is stale
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PARTIALS = ("header", "footer")
SKIP_DIRS = {"_partials", "old_backup", ".git", ".netlify", "node_modules"}


def pages():
    for path in sorted(ROOT.rglob("*.html")):
        if not SKIP_DIRS.intersection(path.relative_to(ROOT).parts):
            yield path


def render(html, name, block):
    pattern = re.compile(
        rf"(?P<indent>[ \t]*)<!-- {name}:start -->\n.*?<!-- {name}:end -->", re.S
    )

    def repl(m):
        indent = m.group("indent")
        body = "\n".join(indent + line if line else line for line in block.rstrip("\n").split("\n"))
        return f"{indent}<!-- {name}:start -->\n{body}\n{indent}<!-- {name}:end -->"

    return pattern.sub(repl, html)


def main():
    check = "--check" in sys.argv
    blocks = {n: (ROOT / "_partials" / f"{n}.html").read_text(encoding="utf-8") for n in PARTIALS}
    stale = []

    for path in pages():
        html = path.read_text(encoding="utf-8")
        new = html
        for name, block in blocks.items():
            new = render(new, name, block)
        if new != html:
            stale.append(path.relative_to(ROOT))
            if not check:
                path.write_text(new, encoding="utf-8")

    verb = "Out of date" if check else "Updated"
    for p in stale:
        print(f"{verb}: {p}")
    if not stale:
        print("All pages in sync.")
    sys.exit(1 if check and stale else 0)


if __name__ == "__main__":
    main()
