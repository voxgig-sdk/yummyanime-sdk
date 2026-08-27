
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
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
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://yummyani.me",

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
          "name": "description",
          "short": "Description or synopsis of the anime",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the anime",
          "type": "`$STRING`"
        },
        {
          "name": "thumbnail",
          "short": "URL to the anime thumbnail image",
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "short": "Title of the anime",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "short": "URL to the anime details page",
          "type": "`$STRING`"
        }
      ],
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/search",
              "parts": [
                "search"
              ],
              "select": {
                "exist": [
                  "query"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
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
  config
}

