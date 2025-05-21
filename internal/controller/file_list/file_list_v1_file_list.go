package file_list

import (
	"context"

	v1 "aurora-file-sharing/api/file_list/v1"
	"aurora-file-sharing/internal/dao"
)

func (c *ControllerV1) FileList(ctx context.Context, req *v1.FileListReq) (res *v1.FileListRes, err error) {
	res = &v1.FileListRes{}
	// Ctx方法创建orm gdb.Model
	err = dao.FileList.Ctx(ctx).Where("tag_id = ?", req.TagId).Limit(req.PageSize, (req.Page-1)*req.PageSize).Scan(&res.List)
	return
}
