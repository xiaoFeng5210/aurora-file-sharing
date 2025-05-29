package service

import (
	"context"

	v1 "aurora-file-sharing/api/file_list/v1"
	"aurora-file-sharing/internal/dao"

	"github.com/gogf/gf/v2/database/gdb"
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

func GetAllTagsByFileId(ctx context.Context, fileId string) (res *gdb.Model) {
	filesDao := dao.FileList.Ctx(ctx)
	res = filesDao.InnerJoin("file_tag_relation", "ftr", "ftr.file_id = file_list.file_id").InnerJoin("tags", "tags.tag_id = ftr.tag_id").Fields("tags.*, file_list.file_id, file_list.file_name").Where("file_list.file_id = ?", fileId)
	return
}

// 查询列表（带着拥有的标签数据）
func GetFileListWithTags(ctx context.Context, data *v1.FileListReq) (res *gdb.Model) {
	filesDao := dao.FileList.Ctx(ctx)
	model := filesDao.InnerJoin("file_tag_relation", "ftr", "ftr.file_id = file_list.file_id").InnerJoin("tags", "tags.tag_id = ftr.tag_id")
	if data.FileId != "" {
		model = model.Where("file_list.file_id = ?", data.FileId)
	}
	if data.FileName != "" {
		model = model.Where("file_list.file_name like ?", "%"+data.FileName+"%")
	}
	res = model.Limit(data.PageSize, (data.Page-1)*data.PageSize)
	return
}
