import sys, json, urllib.request

api_url = sys.argv[1]
output_var_path = sys.argv[2]

try:
    with urllib.request.urlopen(api_url) as r:
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
    with urllib.request.urlopen(latest['download_url']) as r:
        content = r.read().decode('utf-8')
    print(f"fetched {latest['name']}")
    with open(output_var_path, 'w') as f:
        f.write(content)
except Exception as e:
    print(f'error fetching {latest["name"]}: {e}')
    with open(output_var_path, 'w') as f:
        f.write('')
