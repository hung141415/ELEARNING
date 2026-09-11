import urllib.request
import re

url = "http://localhost:3000"
req = urllib.request.urlopen(url)
html = req.read().decode("utf-8")
print("Page status:", req.status, "Length:", len(html))

css_links = re.findall(r'href="([^"]+\.css[^"]*)"', html)
print("Found CSS links:", css_links)

for link in css_links:
    css_url = "http://localhost:3000" + link if link.startswith("/") else link
    try:
        c_res = urllib.request.urlopen(css_url)
        content = c_res.read()
        print(f"[SUCCESS] {link} -> HTTP {c_res.status}, size: {len(content)} bytes")
    except Exception as e:
        print(f"[FAIL] {link} -> {e}")
