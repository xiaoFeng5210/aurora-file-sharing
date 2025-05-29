package v1

import (
	"github.com/gogf/gf/v2/frame/g"
)

// 根据文件id查询所有标签
type GetAllTagsByFileIdReq struct {
	g.Meta `path:"/file_tag_relation" method:"get" tags:"文件标签管理" summary:"根据文件id查询所有标签"`
	FileId string `v:"required" dc:"文件ID"`
}

type GetAllTagsByFileIdRes struct {
	Tags []interface{} `json:"tags" dc:"标签列表"`
}
