package file_list

import (
	"context"

	"github.com/gogf/gf/v2/errors/gcode"
	"github.com/gogf/gf/v2/errors/gerror"

	v1 "aurora-file-sharing/api/file_list/v1"
)

func (c *ControllerV1) FileList(ctx context.Context, req *v1.FileListReq) (res *v1.FileListRes, err error) {
	return nil, gerror.NewCode(gcode.CodeNotImplemented)
}
