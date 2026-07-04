package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/yummyanime-sdk/go"
	"github.com/voxgig-sdk/yummyanime-sdk/go/core"

	vs "github.com/voxgig-sdk/yummyanime-sdk/go/utility/struct"
)

func TestAnimeEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Anime(nil)
		if ent == nil {
			t.Fatal("expected non-nil AnimeEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := animeBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "anime." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set YUMMYANIME_TEST_ANIME_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		animeRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.anime", setup.data)))
		var animeRef01Data map[string]any
		if len(animeRef01DataRaw) > 0 {
			animeRef01Data = core.ToMapAny(animeRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = animeRef01Data

		// LIST
		animeRef01Ent := client.Anime(nil)
		animeRef01Match := map[string]any{}

		animeRef01ListResult, err := animeRef01Ent.List(animeRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, animeRef01ListOk := animeRef01ListResult.([]any)
		if !animeRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", animeRef01ListResult)
		}

	})
}

func animeBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "anime", "AnimeTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read anime test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse anime test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"anime01", "anime02", "anime03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("YUMMYANIME_TEST_ANIME_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"YUMMYANIME_TEST_ANIME_ENTID": idmap,
		"YUMMYANIME_TEST_LIVE":      "FALSE",
		"YUMMYANIME_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["YUMMYANIME_TEST_ANIME_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["YUMMYANIME_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewYummyanimeSDK(core.ToMapAny(mergedOpts))
	}

	live := env["YUMMYANIME_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["YUMMYANIME_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
