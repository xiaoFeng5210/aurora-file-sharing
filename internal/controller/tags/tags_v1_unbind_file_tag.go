package tags

import (
	"context"

	"aurora-file-sharing/internal/service"

	v1 "aurora-file-sharing/api/tags/v1"
)

func (c *ControllerV1) UnbindFileTag(ctx context.Context, req *v1.UnbindFileTagReq) (res *v1.UnbindFileTagRes, err error) {
	err = service.UnbindFileTag(ctx, req.FileId, req.TagId)
	if err != nil {
		return nil, err
	}
	return
}
