<?php
declare(strict_types=1);

// Yummyanime SDK utility: feature_add

class YummyanimeFeatureAdd
{
    public static function call(YummyanimeContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
