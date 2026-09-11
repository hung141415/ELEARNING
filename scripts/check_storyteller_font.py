import urllib.request
import re

req = urllib.request.Request('https://storyteller.manhvibe.vn/', headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req, timeout=5).read().decode('utf-8')
    fonts = re.findall(r'fonts\.googleapis\.com[^\"]+', html)
    font_families = re.findall(r'font-family:[^;]+', html)
    print('Fonts found:', set(fonts))
    print('Font families found:', set(font_families[:10]))
except Exception as e:
    print('Err:', e)
