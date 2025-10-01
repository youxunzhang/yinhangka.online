#!/usr/bin/env python3
"""Generate sitemap.xml entries for the static site."""
from __future__ import annotations

import argparse
import os
from datetime import datetime, timezone
from typing import Dict, Iterable
from xml.etree.ElementTree import Element, SubElement, tostring
import xml.dom.minidom as minidom

DEFAULT_BASE_URL = "https://yinhangka.online"
IGNORE_FILES = {"404.html"}


def iter_html_files(root: str = ".") -> Iterable[str]:
    for current_root, dirs, files in os.walk(root):
        if current_root.startswith(os.path.join(root, ".git")):
            continue
        for filename in files:
            if not filename.endswith(".html"):
                continue
            rel_path = os.path.join(current_root, filename)
            rel_path = os.path.relpath(rel_path, root)
            if rel_path in IGNORE_FILES:
                continue
            yield rel_path.replace(os.path.sep, "/")


def file_to_url(base_url: str, relative_path: str) -> str:
    if relative_path == "index.html":
        return f"{base_url}/"
    if relative_path.endswith("/index.html"):
        return f"{base_url}/" + relative_path[:-10]
    return f"{base_url}/" + relative_path


def collect_entries(base_url: str, root: str = ".") -> Dict[str, str]:
    entries: Dict[str, str] = {}
    for rel_path in iter_html_files(root):
        url = file_to_url(base_url, rel_path)
        stat = os.stat(os.path.join(root, rel_path))
        lastmod = datetime.fromtimestamp(stat.st_mtime, tz=timezone.utc).strftime("%Y-%m-%d")
        entries[url] = lastmod
    if f"{base_url}/" not in entries:
        entries[f"{base_url}/"] = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    return entries


def build_xml(entries: Dict[str, str], base_url: str) -> bytes:
    sorted_urls = sorted(entries)
    home_url = f"{base_url}/"
    if home_url in entries:
        sorted_urls = [home_url] + [u for u in sorted_urls if u != home_url]
    urlset = Element("urlset", {"xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9"})
    for url in sorted_urls:
        url_el = SubElement(urlset, "url")
        SubElement(url_el, "loc").text = url
        SubElement(url_el, "lastmod").text = entries[url]
    xml_bytes = tostring(urlset, encoding="utf-8")
    xml_dom = minidom.parseString(xml_bytes)
    return xml_dom.toprettyxml(indent="    ", encoding="UTF-8")


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate sitemap.xml for the static site")
    parser.add_argument("--base-url", default=DEFAULT_BASE_URL, help="Base URL of the site")
    parser.add_argument("--root", default=".", help="Root directory to scan for HTML files")
    parser.add_argument("--output", default="sitemap.xml", help="Output file path")
    args = parser.parse_args()

    base_url = args.base_url.rstrip("/")
    entries = collect_entries(base_url, args.root)
    xml_bytes = build_xml(entries, base_url)
    with open(args.output, "wb") as fh:
        fh.write(xml_bytes)


if __name__ == "__main__":
    main()
