import requests
import re

url = "https://slateblue-hedgehog-572890.hostingersite.com/"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
}

try:
    r = requests.get(url, headers=headers, timeout=15)
    print("Status:", r.status_code)
    imgs = re.findall(r'<img[^>]+src="([^">]+)"', r.text)
    for img in imgs:
        print("Found:", img)
except Exception as e:
    print("Error:", e)
