<?php
declare(strict_types=1);

// Yummyanime SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

YummyanimeUtility::setRegistrar(function (YummyanimeUtility $u): void {
    $u->clean = [YummyanimeClean::class, 'call'];
    $u->done = [YummyanimeDone::class, 'call'];
    $u->make_error = [YummyanimeMakeError::class, 'call'];
    $u->feature_add = [YummyanimeFeatureAdd::class, 'call'];
    $u->feature_hook = [YummyanimeFeatureHook::class, 'call'];
    $u->feature_init = [YummyanimeFeatureInit::class, 'call'];
    $u->fetcher = [YummyanimeFetcher::class, 'call'];
    $u->make_fetch_def = [YummyanimeMakeFetchDef::class, 'call'];
    $u->make_context = [YummyanimeMakeContext::class, 'call'];
    $u->make_options = [YummyanimeMakeOptions::class, 'call'];
    $u->make_request = [YummyanimeMakeRequest::class, 'call'];
    $u->make_response = [YummyanimeMakeResponse::class, 'call'];
    $u->make_result = [YummyanimeMakeResult::class, 'call'];
    $u->make_point = [YummyanimeMakePoint::class, 'call'];
    $u->make_spec = [YummyanimeMakeSpec::class, 'call'];
    $u->make_url = [YummyanimeMakeUrl::class, 'call'];
    $u->param = [YummyanimeParam::class, 'call'];
    $u->prepare_auth = [YummyanimePrepareAuth::class, 'call'];
    $u->prepare_body = [YummyanimePrepareBody::class, 'call'];
    $u->prepare_headers = [YummyanimePrepareHeaders::class, 'call'];
    $u->prepare_method = [YummyanimePrepareMethod::class, 'call'];
    $u->prepare_params = [YummyanimePrepareParams::class, 'call'];
    $u->prepare_path = [YummyanimePreparePath::class, 'call'];
    $u->prepare_query = [YummyanimePrepareQuery::class, 'call'];
    $u->result_basic = [YummyanimeResultBasic::class, 'call'];
    $u->result_body = [YummyanimeResultBody::class, 'call'];
    $u->result_headers = [YummyanimeResultHeaders::class, 'call'];
    $u->transform_request = [YummyanimeTransformRequest::class, 'call'];
    $u->transform_response = [YummyanimeTransformResponse::class, 'call'];
});
