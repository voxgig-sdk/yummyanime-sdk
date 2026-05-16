
import { Context } from './Context'


class YummyanimeError extends Error {

  isYummyanimeError = true

  sdk = 'Yummyanime'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  YummyanimeError
}

