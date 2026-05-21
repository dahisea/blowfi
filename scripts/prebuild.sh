#!/bin/bash
# Copy index.md / _index.md -> *.zh-SG.md for every content directory
# so Hugo multilingual works with a single source file.
find content \( -name 'index.md' -o -name '_index.md' \) | while read f; do
  target="${f%.md}.zh-SG.md"
  if [ ! -f "$target" ]; then
    cp "$f" "$target"
  fi
done
