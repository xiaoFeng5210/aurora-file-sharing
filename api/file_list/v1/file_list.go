package v1

import (
	"aurora-file-sharing/internal/model/entity"

	"github.com/gogf/gf/v2/frame/g"
)

// 查询
type FileListReq struct {
	g.Meta   `path:"/file_list" method:"get" tags:"FileList" summary:"Get file list"`
	TagId    string `dc:"标签ID"`
	Page     int    `v:"min:1" dc:"页码"`
	PageSize int    `v:"min:1" dc:"每页数量"`
}
type FileListRes struct {
	List  []*entity.FileList `json:"list" dc:"文件列表"`
	Total int                `json:"total" dc:"总数量"`
}

// 创建文件数据
type FileCreateReq struct {
	g.Meta   `path:"/file_create" method:"post" tags:"FileCreate" summary:"Create file"`
	TagId    string `dc:"标签ID"`
	FileName string `v:"required" dc:"文件名称"`
}
type FileCreateRes struct {
	FileId string `json:"file_id" dc:"文件ID"`
}
