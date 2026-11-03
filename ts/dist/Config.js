"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Yummyanime',
        slug: "yummyanime",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
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
        retry: {
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
        test: {
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
        timeout: {
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
    };
    options = {
        base: "https://api.yani.tv",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            anime: {},
        }
    };
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
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map