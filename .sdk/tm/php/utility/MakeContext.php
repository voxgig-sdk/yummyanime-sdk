<?php
declare(strict_types=1);

// Yummyanime SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class YummyanimeMakeContext
{
    public static function call(array $ctxmap, ?YummyanimeContext $basectx): YummyanimeContext
    {
        return new YummyanimeContext($ctxmap, $basectx);
    }
}
