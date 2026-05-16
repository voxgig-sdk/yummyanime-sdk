package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAnimeEntityFunc func(client *YummyanimeSDK, entopts map[string]any) YummyanimeEntity

