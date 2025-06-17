package service

import (
	"context"

	v1 "aurora-file-sharing/api/file_list/v1"

	downloadV1 "aurora-file-sharing/api/download/v1"

	"github.com/gogf/gf/v2/errors/gerror"
	"github.com/gogf/gf/v2/frame/g"
)

func DownloadFile(ctx context.Context, fileId string) (res *downloadV1.DownloadRes, err error) {
	// 获取ghttp.Request
	r := g.RequestFromCtx(ctx)

	// 通过fileID获取其他文件信息，路径，文件名，文件类型
	fileList, err := GetFileListWithTags(ctx, &v1.FileListReq{
		FileId: fileId,
	})
	if err != nil {
		return nil, err
	}

	if fileList == nil || len(fileList.List) == 0 {
		return nil, gerror.New("文件不存在")
	}

	currentFile := fileList.List[0]

	r.Response.ServeFileDownload(currentFile.FileLocalPath)

	return &downloadV1.DownloadRes{
		FileId: currentFile.FileId,
	}, nil

}
