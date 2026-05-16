
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { YummyanimeSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await YummyanimeSDK.test()
    equal(null !== testsdk, true)
  })

})
