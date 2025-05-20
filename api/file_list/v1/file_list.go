package v1

import (
	"aurora-file-sharing/internal/model/entity"

	"github.com/gogf/gf/v2/frame/g"
)

type FileListReq struct {
	g.Meta   `path:"/file_list" method:"get" tags:"FileList" summary:"Get file list"`
	TagId    string
	Page     int `v:"min:1" dc:"page"`
	PageSize int `v:"min:1" dc:"page size"`
}
type FileListRes struct {
	List []*entity.FileList `json:"list" dc:"file list"`
}
