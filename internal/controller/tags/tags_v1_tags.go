package tags

import (
	"context"

	"github.com/gogf/gf/v2/errors/gcode"
	"github.com/gogf/gf/v2/errors/gerror"

	"aurora-file-sharing/api/tags/v1"
)

func (c *ControllerV1) Tags(ctx context.Context, req *v1.TagsReq) (res *v1.TagsRes, err error) {
	return nil, gerror.NewCode(gcode.CodeNotImplemented)
}
