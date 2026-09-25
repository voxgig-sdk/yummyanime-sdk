
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { YummyanimeSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = YummyanimeSDK.test()
    equal(testsdk instanceof YummyanimeSDK, true,
      'YummyanimeSDK.test() must return a client synchronously')
  })

})
