# Yummyanime SDK feature factory

from yummyanime_sdk.feature.base_feature import YummyanimeBaseFeature
from yummyanime_sdk.feature.ratelimit_feature import YummyanimeRatelimitFeature
from yummyanime_sdk.feature.retry_feature import YummyanimeRetryFeature
from yummyanime_sdk.feature.test_feature import YummyanimeTestFeature
from yummyanime_sdk.feature.timeout_feature import YummyanimeTimeoutFeature


_FEATURES = {
    "base": lambda: YummyanimeBaseFeature(),
    "ratelimit": lambda: YummyanimeRatelimitFeature(),
    "retry": lambda: YummyanimeRetryFeature(),
    "test": lambda: YummyanimeTestFeature(),
    "timeout": lambda: YummyanimeTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
