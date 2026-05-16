<?php
declare(strict_types=1);

// Yummyanime SDK base feature

class YummyanimeBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(YummyanimeContext $ctx, array $options): void {}
    public function PostConstruct(YummyanimeContext $ctx): void {}
    public function PostConstructEntity(YummyanimeContext $ctx): void {}
    public function SetData(YummyanimeContext $ctx): void {}
    public function GetData(YummyanimeContext $ctx): void {}
    public function GetMatch(YummyanimeContext $ctx): void {}
    public function SetMatch(YummyanimeContext $ctx): void {}
    public function PrePoint(YummyanimeContext $ctx): void {}
    public function PreSpec(YummyanimeContext $ctx): void {}
    public function PreRequest(YummyanimeContext $ctx): void {}
    public function PreResponse(YummyanimeContext $ctx): void {}
    public function PreResult(YummyanimeContext $ctx): void {}
    public function PreDone(YummyanimeContext $ctx): void {}
    public function PreUnexpected(YummyanimeContext $ctx): void {}
}
