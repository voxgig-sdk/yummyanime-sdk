# Yummyanime SDK configuration

module YummyanimeConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Yummyanime",
        "slug" => "yummyanime",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "now" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://api.yani.tv",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "anime" => {},
        },
      },
      "entity" => {
        "anime" => {
          "fields" => [
            {
              "name" => "anime_id",
              "title" => "Anime Id",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "anime_status",
              "title" => "Anime Status",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "anime_url",
              "title" => "Anime Url",
              "type" => "`$STRING`",
            },
            {
              "name" => "blocked_in",
              "title" => "Blocked In",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "description",
              "title" => "Description",
              "type" => "`$STRING`",
            },
            {
              "name" => "min_age",
              "title" => "Min Age",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "poster",
              "title" => "Poster",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "rating",
              "title" => "Rating",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "remote_ids",
              "title" => "Remote Ids",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "season",
              "title" => "Season",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "title",
              "title" => "Title",
              "type" => "`$STRING`",
            },
            {
              "name" => "top",
              "title" => "Top",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "type",
              "title" => "Type",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "views",
              "title" => "Views",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "year",
              "title" => "Year",
              "type" => "`$NUMBER`",
            },
          ],
          "name" => "anime",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/search",
                  "segments" => [
                    {
                      "lit" => "search",
                    },
                  ],
                  "parts" => [
                    "search",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.response`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                      },
                      {
                        "name" => "q",
                        "orig" => "q",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "blue",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "q",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    YummyanimeFeatures.make_feature(name)
  end
end
