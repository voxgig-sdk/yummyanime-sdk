<?php
declare(strict_types=1);

// Yummyanime SDK utility: result_headers

class YummyanimeResultHeaders
{
    public static function call(YummyanimeContext $ctx): ?YummyanimeResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
