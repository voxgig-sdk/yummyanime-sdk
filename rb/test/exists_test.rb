# Yummyanime SDK exists test

require "minitest/autorun"
require_relative "../Yummyanime_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = YummyanimeSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
