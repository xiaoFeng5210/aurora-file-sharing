package file_tag_relation

import (
	"context"

	v1 "aurora-file-sharing/api/file_tag_relation/v1"
	"aurora-file-sharing/internal/service"
)

func (c *ControllerV1) GetAllTagsByFileId(ctx context.Context, req *v1.GetAllTagsByFileIdReq) (res *v1.GetAllTagsByFileIdRes, err error) {
	res = &v1.GetAllTagsByFileIdRes{}
	res.Tags, err = service.GetAllTagsByFileId(ctx, req.FileId)
	if err != nil {
		return nil, err
	}
	return
}
