package file_list

import (
	"context"

	v1 "aurora-file-sharing/api/file_list/v1"
	"aurora-file-sharing/internal/dao"
)

func (c *ControllerV1) FileList(ctx context.Context, req *v1.FileListReq) (res *v1.FileListRes, err error) {
	res = &v1.FileListRes{}
	model := dao.FileList.Query(ctx, req)
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
