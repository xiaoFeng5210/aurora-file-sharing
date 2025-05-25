package v1

import (
	"aurora-file-sharing/internal/model/entity"

	"github.com/gogf/gf/v2/frame/g"
)

// 查询
type FileListReq struct {
	g.Meta   `path:"/file_list" method:"get" tags:"文件管理" summary:"查询文件列表"`
	FileId   string `dc:"文件ID"`
	TagId    string `dc:"标签ID"`
	FileName string `dc:"文件名称"`
	Page     int    `v:"min:1" dc:"页码"`
	PageSize int    `v:"min:1" dc:"每页数量"`
}
type FileListRes struct {
	List  []*entity.FileList `json:"list" dc:"列表数据"`
	Total int                `json:"total" dc:"总数量"`
}

// 创建文件数据
type FileCreateReq struct {
	g.Meta   `path:"/file_create" method:"post" tags:"文件管理" summary:"创建文件"`
	TagId    string `dc:"标签ID"`
	FileName string `v:"required" dc:"文件名称"`
}
type FileCreateRes struct {
	FileId string `json:"fileId" dc:"文件ID"`
}
