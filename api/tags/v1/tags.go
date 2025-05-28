package v1

import (
	"aurora-file-sharing/internal/model/entity"

	"github.com/gogf/gf/v2/frame/g"
)

type TagsReq struct {
	g.Meta   `path:"/tags" method:"get" tags:"标签管理" summary:"查询标签列表"`
	TagId    string `dc:"标签ID"`
	Page     int    `v:"min:1" dc:"页码"`
	PageSize int    `v:"min:1" dc:"每页数量"`
	TagName  string `dc:"标签名称"`
}

type TagsRes struct {
	List  []*entity.Tags `json:"list" v:"required" dc:"列表数据"`
	Total int            `json:"total" dc:"总数量"`
}

type TagsCreateReq struct {
	g.Meta  `path:"/tags" method:"post" tags:"标签管理" summary:"创建标签"`
	TagName string `v:"required" dc:"标签名称"`
}

type TagsCreateRes struct {
	Id int64 `json:"id" dc:"主键ID"`
}

type DeleteReq struct {
	g.Meta `path:"/tags" method:"delete" tags:"标签管理" summary:"删除标签"`
	TagId  string `v:"required" dc:"标签ID"`
}

type DeleteRes struct {
	TagId string `json:"tagId" dc:"标签ID"`
}

// 绑定标签
type BindFileTagReq struct {
	g.Meta `path:"/tags/bind" method:"post" tags:"标签管理" summary:"绑定标签"`
	FileId string `v:"required" dc:"文件ID"`
	TagId  string `v:"required" dc:"标签ID"`
}

type BindFileTagRes struct {
}

// 解绑标签
type UnbindFileTagReq struct {
	g.Meta `path:"/tags/unbind" method:"post" tags:"标签管理" summary:"解绑标签"`
	FileId string `v:"required" dc:"文件ID"`
	TagId  string `v:"required" dc:"标签ID"`
}

type UnbindFileTagRes struct {
}
