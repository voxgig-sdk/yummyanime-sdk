
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Yummyanime',
        slug: "yummyanime",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "now": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api.yani.tv",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        anime: {
        },
  
    }
  }


  entity = {
    "anime": {
      "fields": [
        {
          "name": "anime_id",
          "title": "Anime Id",
          "type": "`$INTEGER`"
        },
        {
          "name": "anime_status",
          "title": "Anime Status",
          "type": "`$OBJECT`"
        },
        {
          "name": "anime_url",
          "title": "Anime Url",
          "type": "`$STRING`"
        },
        {
          "name": "blocked_in",
          "title": "Blocked In",
          "type": "`$ARRAY`"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`"
        },
        {
          "name": "min_age",
          "title": "Min Age",
          "type": "`$OBJECT`"
        },
        {
          "name": "poster",
          "title": "Poster",
          "type": "`$OBJECT`"
        },
        {
          "name": "rating",
          "title": "Rating",
          "type": "`$OBJECT`"
        },
        {
          "name": "remote_ids",
          "title": "Remote Ids",
          "type": "`$OBJECT`"
        },
        {
          "name": "season",
          "title": "Season",
          "type": "`$NUMBER`"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`"
        },
        {
          "name": "top",
          "title": "Top",
          "type": "`$OBJECT`"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$OBJECT`"
        },
        {
          "name": "views",
          "title": "Views",
          "type": "`$NUMBER`"
        },
        {
          "name": "year",
          "title": "Year",
          "type": "`$NUMBER`"
        }
      ],
      "name": "anime",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/search",
              "segments": [
                {
                  "lit": "search"
                }
              ],
              "parts": [
                "search"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.response`"
              },
              "args": {
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "q",
                    "orig": "q",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "blue"
                  }
                ]
              },
              "select": {
                "exist": [
                  "q"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

