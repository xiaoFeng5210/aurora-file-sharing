package service

import (
	v1 "aurora-file-sharing/api/file_list/v1"
	"aurora-file-sharing/internal/dao"
	"aurora-file-sharing/internal/model/entity"
	"context"

	"github.com/gogf/gf/v2/database/gdb"
	"github.com/gogf/gf/v2/errors/gerror"
	"github.com/gogf/gf/v2/os/gtime"
)

type TagListWithFileId struct {
	Id        int         `json:"id"        orm:"id"         description:""`     //
	TagId     string      `json:"tagId"     orm:"tag_id"     description:"标签id"` // 标签id
	TagName   string      `json:"tagName"   orm:"tag_name"   description:"标签名称"` // 标签名称
	CreatedAt *gtime.Time `json:"createdAt" orm:"created_at" description:"创建时间"` // 创建时间
	UpdatedAt *gtime.Time `json:"updatedAt" orm:"updated_at" description:"更新时间"` // 更新时间
	FileId    string      `json:"fileId" orm:"file_id" description:"文件id"`       // 文件id
}

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

/*
* 查询列表（带着拥有的标签数据）
 */
func GetFileListWithTags(ctx context.Context, data *v1.FileListReq) (res *v1.FileListRes, err error) {
	fileList := v1.FileListRes{List: []*v1.FileListWithTags{}, Total: 0}
	tagList := []*TagListWithFileId{}

	model := dao.FileList.Ctx(ctx)
	if data.FileId != "" {
		model = model.Where("file_list.file_id = ?", data.FileId)
	}
	if data.FileName != "" {
		model = model.Where("file_list.file_name like ?", "%"+data.FileName+"%")
	}

	model = model.Limit(data.PageSize, (data.Page-1)*data.PageSize)

	err = model.Scan(&fileList.List)
	if err != nil {
		return nil, err
	}

	fileList.Total, err = model.Count()
	if err != nil {
		return nil, err
	}

	err = dao.Tags.Ctx(ctx).InnerJoin("file_tag_relation", "ftr", "ftr.tag_id = tags.tag_id").Fields("tags.*, ftr.file_id").Scan(&tagList)
	if err != nil {
		return nil, err
	}

	for _, file := range fileList.List {
		file.Tags = []entity.Tags{}
		for _, tag := range tagList {
			if tag.FileId == file.FileId {
				file.Tags = append(file.Tags, entity.Tags{
					Id:        tag.Id,
					TagId:     tag.TagId,
					TagName:   tag.TagName,
					CreatedAt: tag.CreatedAt,
					UpdatedAt: tag.UpdatedAt,
				})
			}
		}
	}
	res = &fileList
	return
}
