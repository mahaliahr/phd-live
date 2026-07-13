import os, sys, json, urllib.request

api_url = sys.argv[1]
output_var_path = sys.argv[2]

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
    with open(output_var_path, 'w') as f:
        f.write('')
    sys.exit(0)

if not isinstance(files, list) or not files:
    print('no daily files found')
    with open(output_var_path, 'w') as f:
        f.write('')
    sys.exit(0)

files.sort(key=lambda f: f['name'], reverse=True)
latest = files[0]

try:
    with _get(latest['download_url']) as r:
        content = r.read().decode('utf-8')
    print(f"fetched {latest['name']}")
    with open(output_var_path, 'w') as f:
        f.write(content)
except Exception as e:
    print(f'error fetching {latest["name"]}: {e}')
    with open(output_var_path, 'w') as f:
        f.write('')
