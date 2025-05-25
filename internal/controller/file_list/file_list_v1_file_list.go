package file_list

import (
	"context"

	v1 "aurora-file-sharing/api/file_list/v1"
	"aurora-file-sharing/internal/dao"
	"aurora-file-sharing/internal/model/entity"

	"github.com/gogf/gf/v2/database/gdb"
	"github.com/gogf/gf/v2/util/gconv"
)

func (c *ControllerV1) FileList(ctx context.Context, req *v1.FileListReq) (res *v1.FileListRes, err error) {
	res = &v1.FileListRes{
		List:  []*entity.FileList{},
		Total: 0,
	}

	record := gdb.Record{}

	if req.FileId != "" {
		record, err = dao.FileList.QueryByFileId(ctx, req.FileId)
		if err != nil {
			return nil, err
		}

		if err = gconv.Struct(record, &res.List); err != nil {
			return nil, err
		}
		res.Total = 1
		return
	}
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
