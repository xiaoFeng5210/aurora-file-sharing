package service

import (
	"context"

	"aurora-file-sharing/internal/dao"

	"github.com/gogf/gf/v2/errors/gerror"
)

func BindFileTag(ctx context.Context, fileId string, tagId string) (err error) {
	_, err = dao.FileList.HasExistFileId(ctx, fileId)
	if err != nil {
		return gerror.New("文件ID不存在")
	}
	_, err = dao.Tags.HasExistTagId(ctx, tagId)
	if err != nil {
		return gerror.New("标签ID不存在")
	}

	result, err := dao.FileTagRelation.Create(ctx, fileId, tagId)
	if err != nil {
		return err
	}
	if rowsAffected, _ := result.RowsAffected(); rowsAffected == 0 {
		return gerror.New("绑定失败, 数据库记录为0")
	}
	return
}

func UnbindFileTag(ctx context.Context, fileId string, tagId string) (err error) {
	_, err = dao.FileList.HasExistFileId(ctx, fileId)
	if err != nil {
		return gerror.New("文件ID不存在")
	}
	_, err = dao.Tags.HasExistTagId(ctx, tagId)
	if err != nil {
		return gerror.New("标签ID不存在")
	}

	_, err = dao.FileTagRelation.Delete(ctx, fileId, tagId)
	if err != nil {
		return err
	}
	return
}
