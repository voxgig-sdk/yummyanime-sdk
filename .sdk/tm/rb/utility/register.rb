# Yummyanime SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

YummyanimeUtility.registrar = ->(u) {
  u.clean = YummyanimeUtilities::Clean
  u.done = YummyanimeUtilities::Done
  u.make_error = YummyanimeUtilities::MakeError
  u.feature_add = YummyanimeUtilities::FeatureAdd
  u.feature_hook = YummyanimeUtilities::FeatureHook
  u.feature_init = YummyanimeUtilities::FeatureInit
  u.fetcher = YummyanimeUtilities::Fetcher
  u.make_fetch_def = YummyanimeUtilities::MakeFetchDef
  u.make_context = YummyanimeUtilities::MakeContext
  u.make_options = YummyanimeUtilities::MakeOptions
  u.make_request = YummyanimeUtilities::MakeRequest
  u.make_response = YummyanimeUtilities::MakeResponse
  u.make_result = YummyanimeUtilities::MakeResult
  u.make_point = YummyanimeUtilities::MakePoint
  u.make_spec = YummyanimeUtilities::MakeSpec
  u.make_url = YummyanimeUtilities::MakeUrl
  u.param = YummyanimeUtilities::Param
  u.prepare_auth = YummyanimeUtilities::PrepareAuth
  u.prepare_body = YummyanimeUtilities::PrepareBody
  u.prepare_headers = YummyanimeUtilities::PrepareHeaders
  u.prepare_method = YummyanimeUtilities::PrepareMethod
  u.prepare_params = YummyanimeUtilities::PrepareParams
  u.prepare_path = YummyanimeUtilities::PreparePath
  u.prepare_query = YummyanimeUtilities::PrepareQuery
  u.result_basic = YummyanimeUtilities::ResultBasic
  u.result_body = YummyanimeUtilities::ResultBody
  u.result_headers = YummyanimeUtilities::ResultHeaders
  u.transform_request = YummyanimeUtilities::TransformRequest
  u.transform_response = YummyanimeUtilities::TransformResponse
}
