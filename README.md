# Yummyanime SDK

Search and fetch anime title details from the YummyAnime (Ями Аниме) Russian-language anime catalogue

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About YummyAnime API

[YummyAnime](https://yummyani.me) (Ями Аниме) is a Russian-language anime streaming and catalogue site offering a free library of titles, current-season listings, episode release schedules, reviews, and community features. This SDK wraps its public search/title API exposed at `https://api.yani.tv`.

What you get from the API:

- Full-text search across the YummyAnime catalogue (e.g. `GET /search?q=tokyo`)
- Details for individual anime titles
- Access to the same catalogue data that powers the yummyani.me front-end

Operational notes: CORS is reported as enabled and no authentication is documented for the public search endpoint. The community catalogue lists an average response time around 298 ms with roughly 93% reliability over a rolling 30-day window. Refer to the site's [Terms of Service](https://yummyani.me/terms-of-service) and [Privacy Policy](https://yummyani.me/privacy-policy) for usage conditions.

## Try it

**TypeScript**
```bash
npm install yummyanime
```

**Python**
```bash
pip install yummyanime-sdk
```

**PHP**
```bash
composer require voxgig/yummyanime-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/yummyanime-sdk/go
```

**Ruby**
```bash
gem install yummyanime-sdk
```

**Lua**
```bash
luarocks install yummyanime-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { YummyanimeSDK } from 'yummyanime'

const client = new YummyanimeSDK({})

// List all animes
const animes = await client.Anime().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o yummyanime-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "yummyanime": {
      "command": "/abs/path/to/yummyanime-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Anime** | An anime title entry from the YummyAnime catalogue, searchable via `GET /search?q=...` on `https://api.yani.tv`. | `/search` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from yummyanime_sdk import YummyanimeSDK

client = YummyanimeSDK({})

# List all animes
animes, err = client.Anime(None).list(None, None)
```

### PHP

```php
<?php
require_once 'yummyanime_sdk.php';

$client = new YummyanimeSDK([]);

// List all animes
[$animes, $err] = $client->Anime(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/yummyanime-sdk/go"

client := sdk.NewYummyanimeSDK(map[string]any{})

// List all animes
animes, err := client.Anime(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Yummyanime_sdk"

client = YummyanimeSDK.new({})

# List all animes
animes, err = client.Anime(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("yummyanime_sdk")

local client = sdk.new({})

-- List all animes
local animes, err = client:Anime(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = YummyanimeSDK.test()
const result = await client.Anime().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = YummyanimeSDK.test(None, None)
result, err = client.Anime(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = YummyanimeSDK::test(null, null);
[$result, $err] = $client->Anime(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Anime(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = YummyanimeSDK.test(nil, nil)
result, err = client.Anime(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Anime(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the YummyAnime API

- Upstream: [https://yummyani.me](https://yummyani.me)
- API docs: [https://freepublicapis.com/yummyanime-api](https://freepublicapis.com/yummyanime-api)

---

Generated from the YummyAnime API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
