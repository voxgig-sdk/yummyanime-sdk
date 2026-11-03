# frozen_string_literal: true

# Typed models for the Yummyanime SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Anime entity data model.
#
# @!attribute [rw] anime_id
#   @return [Integer, nil]
#
# @!attribute [rw] anime_status
#   @return [Hash, nil]
#
# @!attribute [rw] anime_url
#   @return [String, nil]
#
# @!attribute [rw] blocked_in
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] min_age
#   @return [Hash, nil]
#
# @!attribute [rw] poster
#   @return [Hash, nil]
#
# @!attribute [rw] rating
#   @return [Hash, nil]
#
# @!attribute [rw] remote_ids
#   @return [Hash, nil]
#
# @!attribute [rw] season
#   @return [Float, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] top
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [Hash, nil]
#
# @!attribute [rw] views
#   @return [Float, nil]
#
# @!attribute [rw] year
#   @return [Float, nil]
Anime = Struct.new(
  :anime_id,
  :anime_status,
  :anime_url,
  :blocked_in,
  :description,
  :min_age,
  :poster,
  :rating,
  :remote_ids,
  :season,
  :title,
  :top,
  :type,
  :views,
  :year,
  keyword_init: true
)

# Request payload for Anime#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String]
AnimeListMatch = Struct.new(
  :limit,
  :q,
  keyword_init: true
)

