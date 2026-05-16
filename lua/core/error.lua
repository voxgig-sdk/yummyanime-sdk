-- Yummyanime SDK error

local YummyanimeError = {}
YummyanimeError.__index = YummyanimeError


function YummyanimeError.new(code, msg, ctx)
  local self = setmetatable({}, YummyanimeError)
  self.is_sdk_error = true
  self.sdk = "Yummyanime"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function YummyanimeError:error()
  return self.msg
end


function YummyanimeError:__tostring()
  return self.msg
end


return YummyanimeError
