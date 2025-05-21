package v1

import (
	"aurora-file-sharing/internal/model/entity"

	"github.com/gogf/gf/v2/frame/g"
)

// 查询
type FileListReq struct {
	g.Meta   `path:"/file_list" method:"get" tags:"FileList" summary:"Get file list"`
	TagId    string
	Page     int `v:"min:1" dc:"page"`
	PageSize int `v:"min:1" dc:"page size"`
}
type FileListRes struct {
	List []*entity.FileList `json:"list" dc:"file list"`
}

// 创建文件数据
type FileCreateReq struct {
	g.Meta   `path:"/file_create" method:"post" tags:"FileCreate" summary:"Create file"`
	TagId    string
	FileName string `v:"required" dc:"file name"`
}
type FileCreateRes struct {
	FileId string `json:"file_id" dc:"file id"`
}
