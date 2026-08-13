# Yummyanime SDK utility: make_context

from yummyanime_sdk.core.context import YummyanimeContext


def make_context_util(ctxmap, basectx):
    return YummyanimeContext(ctxmap, basectx)
