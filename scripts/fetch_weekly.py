import os, sys, json, urllib.request

api_url = sys.argv[1]
output_path = sys.argv[2]

# Falls back to unauthenticated if unset, so this still works while
# research-infrastructure is public -- the token is only required once
# that repo is private.
TOKEN = os.environ.get('MIRROR_SYNC_TOKEN')


def _get(url):
    req = urllib.request.Request(url)
    if TOKEN:
        req.add_header('Authorization', f'token {TOKEN}')
    return urllib.request.urlopen(req)


try:
    with _get(api_url) as r:
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
        with _get(url) as r:
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
