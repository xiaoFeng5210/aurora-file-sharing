package file_list

import (
	"context"

	v1 "aurora-file-sharing/api/file_list/v1"
	"aurora-file-sharing/internal/dao"
	"aurora-file-sharing/internal/model/do"
)

func (c *ControllerV1) FileList(ctx context.Context, req *v1.FileListReq) (res *v1.FileListRes, err error) {
	res = &v1.FileListRes{}
	err = dao.FileList.Ctx(ctx).Where(
		do.FileList{
			TagId: req.TagId,
		}).Page(req.Page, req.PageSize).Order("created_at", "desc").ScanList(&res.List, "id")
	return
}
