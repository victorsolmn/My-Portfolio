#!/usr/bin/env python3
"""Local preview server that behaves like Netlify for this site.

- /pages/koinbx serves pages/koinbx.html (Netlify "pretty URLs")
- unknown paths get /404.html with a 404 status

    python3 scripts/serve.py [port]    # default 8765
"""

import http.server
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_head(self):
        path = self.path.split("?", 1)[0].split("#", 1)[0]
        local = Path(self.translate_path(path))
        if not local.exists() and local.with_suffix(".html").is_file():
            self.path = path + ".html"
        elif not local.exists():
            body = (ROOT / "404.html").read_bytes()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return None
        return super().send_head()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
    os.chdir(ROOT)
    print(f"Serving {ROOT} at http://localhost:{port}/")
    http.server.ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
