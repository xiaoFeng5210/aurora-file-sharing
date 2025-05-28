package v1

import (
	"aurora-file-sharing/internal/model/entity"

	"github.com/gogf/gf/v2/frame/g"
)

type TagsReq struct {
	g.Meta `path:"/tags" method:"get" tags:"标签管理" summary:"查询标签列表"`
}

type TagsRes struct {
	List  []*entity.Tags `json:"list" dc:"列表数据"`
	Total int            `json:"total" dc:"总数量"`
}
