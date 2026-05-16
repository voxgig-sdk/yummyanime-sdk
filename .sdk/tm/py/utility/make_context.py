# Yummyanime SDK utility: make_context

from core.context import YummyanimeContext


def make_context_util(ctxmap, basectx):
    return YummyanimeContext(ctxmap, basectx)
