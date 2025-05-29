package v1

import (
	"aurora-file-sharing/internal/model/entity"

	"github.com/gogf/gf/v2/frame/g"
)

type TagsAndFileInfo struct {
	entity.Tags
	FileId   string `json:"file_id" dc:"文件ID"`
	FileName string `json:"file_name" dc:"文件名称"`
}

// 根据文件id查询所有标签
type GetAllTagsByFileIdReq struct {
	g.Meta `path:"/file_tag_relation" method:"get" tags:"文件标签管理" summary:"根据文件id查询所有标签"`
	FileId string `v:"required" dc:"文件ID"`
}

type GetAllTagsByFileIdRes struct {
	Tags []TagsAndFileInfo `json:"tags" dc:"标签列表"`
}
