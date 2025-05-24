package file_list

import (
	"context"

	v1 "aurora-file-sharing/api/file_list/v1"
	"aurora-file-sharing/internal/dao"
	"aurora-file-sharing/internal/model/do"

	"strings"
)

func (c *ControllerV1) FileCreate(ctx context.Context, req *v1.FileCreateReq) (res *v1.FileCreateRes, err error) {
	res = &v1.FileCreateRes{}
	uuid := GenerateRandomID()

	strs := strings.Split(req.FileName, ".")
	var fileType string
	if len(strs) > 1 {
		fileType = strs[1]
	} else {
		fileType = "txt"
	}
	record, err := dao.HasExistFileName(ctx, req.FileName)
	if err != nil {
		return nil, err
	}
	if record != nil {
		_, err = dao.FileList.UpdateByFileName(ctx, req.FileName, map[string]any{
			"file_oss_path":   uploadDir + "/" + uploadFileName,
			"file_local_path": uploadDir + "/" + uploadFileName,
		})
		if err != nil {
			return nil, err
		}
		res.FileId = uuid
		return
	}

	filePath := uploadDir + "/" + uploadFileName
	_, err = dao.FileList.Ctx(ctx).Data(do.FileList{
		TagId:         req.TagId,
		FileId:        GenerateRandomID(),
		FileName:      req.FileName,
		FileSize:      100,
		FileType:      fileType,
		FileOssPath:   filePath,
		FileLocalPath: filePath,
	}).InsertAndGetId()
	if err != nil {
		return nil, err
	}

	res.FileId = uuid
	return
}
