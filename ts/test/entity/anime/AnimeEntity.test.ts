

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { YummyanimeSDK, BaseFeature, config, stdutil } from '../../..'

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


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('anime hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of YummyanimeSDK.test(offline).Anime().stream('list')) { }
    }, /offline/)

    for await (const _item of YummyanimeSDK.test(offline).Anime()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = YummyanimeSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Anime().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of YummyanimeSDK.test().Anime().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new YummyanimeSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Anime().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Anime().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = YummyanimeSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Anime().list({"limit":"x","q":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.YUMMYANIME_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'anime.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"anime_id":{"a":true,"h":"Anime Id","n":"anime_id","r":false,"t":"`$INTEGER`","key$":"anime_id","index$":0},"anime_status":{"a":true,"h":"Anime Status","n":"anime_status","r":false,"t":"`$OBJECT`","key$":"anime_status","index$":1},"anime_url":{"a":true,"h":"Anime Url","n":"anime_url","r":false,"t":"`$STRING`","key$":"anime_url","index$":2},"blocked_in":{"a":true,"h":"Blocked In","n":"blocked_in","r":false,"t":"`$ARRAY`","key$":"blocked_in","index$":3},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":4},"min_age":{"a":true,"h":"Min Age","n":"min_age","r":false,"t":"`$OBJECT`","key$":"min_age","index$":5},"poster":{"a":true,"h":"Poster","n":"poster","r":false,"t":"`$OBJECT`","key$":"poster","index$":6},"rating":{"a":true,"h":"Rating","n":"rating","r":false,"t":"`$OBJECT`","key$":"rating","index$":7},"remote_ids":{"a":true,"h":"Remote Ids","n":"remote_ids","r":false,"t":"`$OBJECT`","key$":"remote_ids","index$":8},"season":{"a":true,"h":"Season","n":"season","r":false,"t":"`$NUMBER`","key$":"season","index$":9},"title":{"a":true,"h":"Title","n":"title","r":false,"t":"`$STRING`","key$":"title","index$":10},"top":{"a":true,"h":"Top","n":"top","r":false,"t":"`$OBJECT`","key$":"top","index$":11},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$OBJECT`","key$":"type","index$":12},"views":{"a":true,"h":"Views","n":"views","r":false,"t":"`$NUMBER`","key$":"views","index$":13},"year":{"a":true,"h":"Year","n":"year","r":false,"t":"`$NUMBER`","key$":"year","index$":14}},"name":"anime","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /search","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"blue","k":"query","n":"q","or":"q","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/search","q":{"exist":["q"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body.response`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"anime","name__orig":"anime","Name":"Anime","name_":"anime","name-":"anime","NAME":"ANIME","index$":0}, {"active":true,"entity":"anime","key$":"BasicAnimeFlow","kind":"basic","name":"BasicAnimeFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"anime_ref01"}}],"index$":0}]}, 'Anime', {"GET /search":{"protocol":"http","parameters":[{"name":"q","in":"query","required":true,"description":"Search text","schema":{"type":"string"},"example":"blue","index$":0},{"name":"limit","in":"query","required":false,"schema":{"type":"integer"},"index$":1}]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
