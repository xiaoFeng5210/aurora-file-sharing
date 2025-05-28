package tags

import (
	"context"

	v1 "aurora-file-sharing/api/tags/v1"
	"aurora-file-sharing/internal/dao"
	"aurora-file-sharing/internal/model/entity"
)

func (c *ControllerV1) Tags(ctx context.Context, req *v1.TagsReq) (res *v1.TagsRes, err error) {
	res = &v1.TagsRes{
		List:  make([]*entity.Tags, 0),
		Total: 0,
	}

	model := dao.Tags.Query(ctx, req)
	err = model.Scan(&res.List)
	if err != nil {
		return nil, err
	}
	res.Total, err = model.Count()
	if err != nil {
		return nil, err
	}

	return
}
