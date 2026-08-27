<?php
declare(strict_types=1);

// Yummyanime SDK configuration

class YummyanimeConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Yummyanime",
                "slug" => "yummyanime",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://yummyani.me",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "anime" => [],
                ],
            ],
            "entity" => [
        'anime' => [
          'fields' => [
            [
              'name' => 'description',
              'short' => 'Description or synopsis of the anime',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the anime',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'thumbnail',
              'short' => 'URL to the anime thumbnail image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'short' => 'Title of the anime',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'short' => 'URL to the anime details page',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'anime',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'blue',
                        'kind' => 'query',
                        'name' => 'query',
                        'orig' => 'query',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/search',
                  'parts' => [
                    'search',
                  ],
                  'select' => [
                    'exist' => [
                      'query',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return YummyanimeFeatures::make_feature($name);
    }
}
