import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "anime",
    "accessor": "Anime",
    "op": "list",
    "method": "GET",
    "path": "/search",
    "args": [],
    "select": {
      "q": "blue",
      "limit": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "q",
      "limit"
    ],
    "queryArgs": [
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "q",
        "wire": "q"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "response": [
        {
          "description": "x",
          "poster": {},
          "title": "x",
          "anime_url": "x",
          "anime_id": 1,
          "rating": {},
          "year": 1,
          "min_age": {},
          "views": 1,
          "season": 1,
          "anime_status": {},
          "type": {},
          "remote_ids": {},
          "top": {},
          "blocked_in": []
        }
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
