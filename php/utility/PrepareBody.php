<?php
declare(strict_types=1);

// Yummyanime SDK utility: prepare_body

class YummyanimePrepareBody
{
    public static function call(YummyanimeContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
