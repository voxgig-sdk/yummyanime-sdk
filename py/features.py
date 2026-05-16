# Yummyanime SDK feature factory

from feature.base_feature import YummyanimeBaseFeature
from feature.test_feature import YummyanimeTestFeature


def _make_feature(name):
    features = {
        "base": lambda: YummyanimeBaseFeature(),
        "test": lambda: YummyanimeTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
