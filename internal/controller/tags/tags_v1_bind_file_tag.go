package tags

import (
	"context"

	"aurora-file-sharing/internal/service"

	v1 "aurora-file-sharing/api/tags/v1"
)

func (c *ControllerV1) BindFileTag(ctx context.Context, req *v1.BindFileTagReq) (res *v1.BindFileTagRes, err error) {
	res = &v1.BindFileTagRes{}
	err = service.BindFileTag(ctx, req.FileId, req.TagId)
	if err != nil {
		return nil, err
	}
	return
}
