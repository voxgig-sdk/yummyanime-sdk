<?php
declare(strict_types=1);

// Yummyanime SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class YummyanimeFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new YummyanimeBaseFeature();
            case "test":
                return new YummyanimeTestFeature();
            default:
                return new YummyanimeBaseFeature();
        }
    }
}
