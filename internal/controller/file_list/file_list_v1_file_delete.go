package file_list

import (
	"context"

	"aurora-file-sharing/internal/dao"

	v1 "aurora-file-sharing/api/file_list/v1"

	"os"

	"fmt"

	"github.com/gogf/gf/v2/errors/gerror"
	"github.com/gogf/gf/v2/util/gconv"
)

func (c *ControllerV1) FileDelete(ctx context.Context, req *v1.FileDeleteReq) (res *v1.FileDeleteRes, err error) {
	res = &v1.FileDeleteRes{
		FileId: req.FileId,
	}

	if req.FileId != "" {
		fileInfo, err := dao.FileList.QueryByFileId(ctx, req.FileId)
		if err != nil {
			return nil, err
		}

		execPath, err := os.Executable()
		fmt.Println(execPath)

		if err = gconv.Struct(fileInfo, &res); err != nil {
			return nil, err
		}

		if res.FileLocation != "" {
			err = os.Remove(res.FileLocation)
			if err != nil {
				return nil, gerror.New("删除本地文件失败")
			}
		}
	}

	_, err = dao.FileList.DeleteByFileId(ctx, req.FileId)
	if err != nil {
		return nil, err
	}

	return
}
