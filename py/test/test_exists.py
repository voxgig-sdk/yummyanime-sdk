# ProjectName SDK exists test

import pytest
from yummyanime_sdk import YummyanimeSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = YummyanimeSDK.test(None, None)
        assert testsdk is not None
