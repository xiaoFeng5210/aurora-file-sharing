// =================================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package do

import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/os/gtime"
)

// Tags is the golang structure of table tags for DAO operations like Where/Data.
type Tags struct {
	g.Meta    `orm:"table:tags, do:true"`
	Id        interface{} //
	TagId     interface{} // 标签id
	TagName   interface{} // 标签名称
	CreatedAt *gtime.Time // 创建时间
	UpdatedAt *gtime.Time // 更新时间
}
