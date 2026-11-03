-- Typed models for the Yummyanime SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Anime
---@field anime_id? number
---@field anime_status? table
---@field anime_url? string
---@field blocked_in? table
---@field description? string
---@field min_age? table
---@field poster? table
---@field rating? table
---@field remote_ids? table
---@field season? number
---@field title? string
---@field top? table
---@field type? table
---@field views? number
---@field year? number

---@class AnimeListMatch
---@field limit? number
---@field q string

local M = {}

return M
