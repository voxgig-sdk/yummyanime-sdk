-- Yummyanime SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Yummyanime",
      slug = "yummyanime",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["now"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://api.yani.tv",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["anime"] = {},
      },
    },
    entity = {
      ["anime"] = {
        ["fields"] = {
          {
            ["name"] = "anime_id",
            ["title"] = "Anime Id",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "anime_status",
            ["title"] = "Anime Status",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "anime_url",
            ["title"] = "Anime Url",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "blocked_in",
            ["title"] = "Blocked In",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "min_age",
            ["title"] = "Min Age",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "poster",
            ["title"] = "Poster",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "rating",
            ["title"] = "Rating",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "remote_ids",
            ["title"] = "Remote Ids",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "season",
            ["title"] = "Season",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "title",
            ["title"] = "Title",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "top",
            ["title"] = "Top",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "views",
            ["title"] = "Views",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "year",
            ["title"] = "Year",
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "anime",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/search",
                ["segments"] = {
                  {
                    ["lit"] = "search",
                  },
                },
                ["parts"] = {
                  "search",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.response`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "blue",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "q",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
