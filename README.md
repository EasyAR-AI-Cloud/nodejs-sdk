### Usage

#### `run`
```
Usage: node run.js <image> [hand|body] [-t host] [-c keys]

Options:
  -h, --help  Show help                                                [boolean]
  -t, --host                          [default: "http://ai-api.easyar.com:8080"]
  -c, --keys                                              [default: "keys.json"]

copyright 2018, sightp.com
```

#### `image`
Mobile camera and RGB based jpg are supported.

4 channel's image and png are not supported.

#### `example`
```
node run.js onehandheart.jpg hand -c keys.json -t http://ai-api.easyar.com:8080

node run.js twohandonhip.jpg body
```
