# Yummyanime SDK utility: make_context
require_relative '../core/context'
module YummyanimeUtilities
  MakeContext = ->(ctxmap, basectx) {
    YummyanimeContext.new(ctxmap, basectx)
  }
end
