<?php
declare(strict_types=1);

// Typed models for the Yummyanime SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Anime entity data model. */
class Anime
{
    public ?int $anime_id = null;
    public ?array $anime_status = null;
    public ?string $anime_url = null;
    public ?array $blocked_in = null;
    public ?string $description = null;
    public ?array $min_age = null;
    public ?array $poster = null;
    public ?array $rating = null;
    public ?array $remote_ids = null;
    public ?float $season = null;
    public ?string $title = null;
    public ?array $top = null;
    public ?array $type = null;
    public ?float $views = null;
    public ?float $year = null;
}

/** Request payload for Anime#list. */
class AnimeListMatch
{
    public ?int $limit = null;
    public string $q;
}

