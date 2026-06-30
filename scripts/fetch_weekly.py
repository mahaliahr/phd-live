import sys, json, urllib.request

api_url = sys.argv[1]
output_path = sys.argv[2]

try:
    with urllib.request.urlopen(api_url) as r:
        files = json.load(r)
except Exception as e:
    print(f'API error: {e}')
    with open(output_path, 'w') as f:
        json.dump([], f)
    sys.exit(0)

if not isinstance(files, list) or not files:
    print('no weekly files found')
    with open(output_path, 'w') as f:
        json.dump([], f)
    sys.exit(0)

files.sort(key=lambda f: f['name'], reverse=True)
results = []
for f in files[:8]:
    url = f['download_url']
    try:
        with urllib.request.urlopen(url) as r:
            content = r.read().decode('utf-8')
        if content.strip():
            week = url.split('/')[-1].replace('.md', '')
            results.append({'week': week, 'raw': content})
            print(f'fetched {week}')
    except Exception as e:
        print(f'error fetching {url}: {e}')

with open(output_path, 'w') as f:
    json.dump(results, f)

print(f'total: {len(results)} weekly files')
