# Yummyanime SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module YummyanimeFeatures
  def self.make_feature(name)
    case name
    when "base"
      YummyanimeBaseFeature.new
    when "ratelimit"
      YummyanimeRatelimitFeature.new
    when "retry"
      YummyanimeRetryFeature.new
    when "test"
      YummyanimeTestFeature.new
    when "timeout"
      YummyanimeTimeoutFeature.new
    else
      YummyanimeBaseFeature.new
    end
  end
end
