# Yummyanime SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Yummyanime",
            "slug": "yummyanime",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://yummyani.me",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "anime": {},
            },
        },
        "entity": {
      "anime": {
        "fields": [
          {
            "name": "description",
            "short": "Description or synopsis of the anime",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the anime",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "thumbnail",
            "short": "URL to the anime thumbnail image",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "short": "Title of the anime",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "url",
            "short": "URL to the anime details page",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "anime",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "blue",
                      "kind": "query",
                      "name": "query",
                      "orig": "query",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/search",
                "segments": [
                  {
                    "lit": "search",
                  },
                ],
                "select": {
                  "exist": [
                    "query",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "search",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
