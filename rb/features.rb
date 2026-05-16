# Yummyanime SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module YummyanimeFeatures
  def self.make_feature(name)
    case name
    when "base"
      YummyanimeBaseFeature.new
    when "test"
      YummyanimeTestFeature.new
    else
      YummyanimeBaseFeature.new
    end
  end
end
