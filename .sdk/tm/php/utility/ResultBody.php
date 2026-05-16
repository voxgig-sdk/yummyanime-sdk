<?php
declare(strict_types=1);

// Yummyanime SDK utility: result_body

class YummyanimeResultBody
{
    public static function call(YummyanimeContext $ctx): ?YummyanimeResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
