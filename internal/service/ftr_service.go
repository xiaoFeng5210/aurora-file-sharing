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

func GetAllTagsByFileId(ctx context.Context, fileId string) (res []interface{}, err error) {
	res = make([]interface{}, 0)
	filesDao := dao.FileList.Ctx(ctx)
	err = filesDao.InnerJoin("file_tag_relation", "ftr", "ftr.file_id = files.file_id").InnerJoin("tags", "tags.tag_id = ftr.tag_id").Fields("tags.*, files.file_id, files.file_name").Where("files.file_id = ?", fileId).Scan(&res)
	if err != nil {
		return nil, err
	}
	return
}
