# Yummyanime SDK utility: prepare_body
require_relative 'media'
module YummyanimeUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return YummyanimeUtilities.raw_body(ctx.reqdata) if YummyanimeUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
