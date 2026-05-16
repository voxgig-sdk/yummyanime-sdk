# Yummyanime SDK utility: feature_add
module YummyanimeUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
