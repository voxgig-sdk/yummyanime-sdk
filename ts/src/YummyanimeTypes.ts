// Typed models for the Yummyanime SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Anime {
  anime_id?: number
  anime_status?: Record<string, any>
  anime_url?: string
  blocked_in?: any[]
  description?: string
  min_age?: Record<string, any>
  poster?: Record<string, any>
  rating?: Record<string, any>
  remote_ids?: Record<string, any>
  season?: number
  title?: string
  top?: Record<string, any>
  type?: Record<string, any>
  views?: number
  year?: number
}

export interface AnimeListMatch {
  limit?: number
  q: string
}

