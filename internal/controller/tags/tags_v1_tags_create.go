package tags

import (
	"context"

	v1 "aurora-file-sharing/api/tags/v1"

	"aurora-file-sharing/internal/dao"

	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/util/guid"
)

func (c *ControllerV1) TagsCreate(ctx context.Context, req *v1.TagsCreateReq) (res *v1.TagsCreateRes, err error) {
	res = &v1.TagsCreateRes{}
	tagId := guid.S()
	data := g.Map{
		"tag_id":   tagId,
		"tag_name": req.TagName,
	}
	id, err := dao.Tags.Create(ctx, data)
	if err != nil {
		return nil, err
	}
	res.Id = id
	return
}
