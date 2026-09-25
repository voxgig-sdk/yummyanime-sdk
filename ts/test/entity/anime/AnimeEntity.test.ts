

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { YummyanimeSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('AnimeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when YUMMYANIME_TEST_LIVE=TRUE.
  afterEach(liveDelay('YUMMYANIME_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = YummyanimeSDK.test()
    const ent = testsdk.Anime()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YUMMYANIME_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'anime.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description or synopsis of the anime","t":"`$STRING`","key$":"description","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the anime","t":"`$STRING`","key$":"id","index$":1},"thumbnail":{"a":true,"fo":"uri","h":"Thumbnail","n":"thumbnail","r":false,"sh":"URL to the anime thumbnail image","t":"`$STRING`","key$":"thumbnail","index$":2},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"Title of the anime","t":"`$STRING`","key$":"title","index$":3},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"sh":"URL to the anime details page","t":"`$STRING`","key$":"url","index$":4}},"id":{"field":"id","name":"id"},"name":"anime","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /search","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"blue","k":"query","n":"query","or":"query","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/search","q":{"exist":["query"]},"r":{},"s":[{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"anime","name__orig":"anime","Name":"Anime","name_":"anime","name-":"anime","NAME":"ANIME","index$":0}, {"active":true,"entity":"anime","key$":"BasicAnimeFlow","kind":"basic","name":"BasicAnimeFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"anime_ref01"}}],"index$":0}]}, 'Anime', {"GET /search":{"protocol":"http","operationId":"searchAnime","responses":{"200":{"description":"Successful search response containing anime results","content":{"application/json":{"schema":{"type":"object","properties":{"results":{"items":{"properties":{"description":{"description":"Description or synopsis of the anime","type":"string","key$":"description"},"id":{"description":"Unique identifier for the anime","type":"string","key$":"id"},"thumbnail":{"description":"URL to the anime thumbnail image","format":"uri","type":"string","key$":"thumbnail"},"title":{"description":"Title of the anime","type":"string","key$":"title"},"url":{"description":"URL to the anime details page","format":"uri","type":"string","key$":"url"}},"type":"object","index$":0},"key$":"results","type":"array"},"total":{"description":"Total number of search results","key$":"total","type":"integer"}}}}}},"400":{"description":"Bad request - invalid search query","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message describing what went wrong"}}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message describing the server issue"}}}}}}},"parameters":[{"name":"query","in":"query","description":"Search query term to find anime titles","required":true,"schema":{"type":"string","example":"blue"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let anime_ref01_data = Object.values(setup.data.existing.anime)[0] as any

    // LIST
    const anime_ref01_ent = client.Anime()
    const anime_ref01_match: any = {}

    const anime_ref01_list = (await anime_ref01_ent.list(anime_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/anime/AnimeTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = YummyanimeSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['anime01','anime02','anime03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'YUMMYANIME_TEST_ANIME_ENTID': idmap,
    'YUMMYANIME_TEST_LIVE': 'FALSE',
    'YUMMYANIME_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['YUMMYANIME_TEST_ANIME_ENTID']

  const live = 'TRUE' === env.YUMMYANIME_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['YUMMYANIME_TEST_ANIME_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new YummyanimeSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.YUMMYANIME_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
