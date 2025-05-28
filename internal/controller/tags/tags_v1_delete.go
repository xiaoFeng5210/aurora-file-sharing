package tags

import (
	"context"

	v1 "aurora-file-sharing/api/tags/v1"

	"aurora-file-sharing/internal/dao"
)

func (c *ControllerV1) Delete(ctx context.Context, req *v1.DeleteReq) (res *v1.DeleteRes, err error) {
	res = &v1.DeleteRes{}
	err = dao.Tags.Delete(ctx, req.TagId)
	if err != nil {
		return nil, err
	}
	res.TagId = req.TagId
	return
}
