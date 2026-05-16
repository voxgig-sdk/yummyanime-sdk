package core

type YummyanimeError struct {
	IsYummyanimeError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewYummyanimeError(code string, msg string, ctx *Context) *YummyanimeError {
	return &YummyanimeError{
		IsYummyanimeError: true,
		Sdk:              "Yummyanime",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *YummyanimeError) Error() string {
	return e.Msg
}
