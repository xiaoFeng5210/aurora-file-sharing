package file_list

import (
	"context"

	"aurora-file-sharing/internal/dao"

	v1 "aurora-file-sharing/api/file_list/v1"

	"os"

	"github.com/gogf/gf/v2/errors/gerror"
	"github.com/gogf/gf/v2/util/gconv"
)

func (c *ControllerV1) FileDelete(ctx context.Context, req *v1.FileDeleteReq) (res *v1.FileDeleteRes, err error) {
	res = &v1.FileDeleteRes{
		FileId: req.FileId,
	}
	fileInfo, err := dao.FileList.QueryByFileId(ctx, req.FileId)
	if err != nil {
		return nil, err
	}

	if err = gconv.Struct(fileInfo, &res); err != nil {
		return nil, gerror.New("转换文件信息失败")
	}

	_, err = dao.FileList.DeleteByFileId(ctx, req.FileId)
	if err != nil {
		return nil, err
	}

	if res.FileLocalPath != "" {
		if _, err := os.Stat(res.FileLocalPath); os.IsNotExist(err) {
			return nil, gerror.New("本地文件不存在")
		}
		if err := os.Remove(res.FileLocalPath); err != nil {
			return nil, gerror.New("删除本地文件失败")
		}
	}

	return
}
