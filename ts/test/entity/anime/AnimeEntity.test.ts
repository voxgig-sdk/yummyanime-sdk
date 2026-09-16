

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"description","req":false,"short":"Description or synopsis of the anime","type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"short":"Unique identifier for the anime","type":"`$STRING`","index$":1},{"active":true,"format":"uri","name":"thumbnail","req":false,"short":"URL to the anime thumbnail image","type":"`$STRING`","index$":2},{"active":true,"name":"title","req":false,"short":"Title of the anime","type":"`$STRING`","index$":3},{"active":true,"format":"uri","name":"url","req":false,"short":"URL to the anime details page","type":"`$STRING`","index$":4}],"id":{"field":"id","name":"id"},"name":"anime","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"blue","kind":"query","name":"query","orig":"query","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /search","json":"{\"operationId\":\"searchAnime\",\"parameters\":[{\"description\":\"Search query term to find anime titles\",\"in\":\"query\",\"name\":\"query\",\"required\":true,\"schema\":{\"example\":\"blue\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"results\":{\"items\":{\"properties\":{\"description\":{\"description\":\"Description or synopsis of the anime\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the anime\",\"type\":\"string\"},\"thumbnail\":{\"description\":\"URL to the anime thumbnail image\",\"format\":\"uri\",\"type\":\"string\"},\"title\":{\"description\":\"Title of the anime\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the anime details page\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"description\":\"Total number of search results\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful search response containing anime results\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid search query\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing the server issue\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/search","segments":[{"lit":"search"}],"select":{"exist":["query"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"anime","name__orig":"anime","Name":"Anime","name_":"anime","name-":"anime","NAME":"ANIME","index$":0}, {"active":true,"entity":"anime","key$":"BasicAnimeFlow","kind":"basic","name":"BasicAnimeFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"anime_ref01"}}],"index$":0}]}, 'Anime')
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
  
