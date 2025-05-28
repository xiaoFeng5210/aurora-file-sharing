// =================================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package do

import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/os/gtime"
)

// FileTagRelation is the golang structure of table file_tag_relation for DAO operations like Where/Data.
type FileTagRelation struct {
	g.Meta    `orm:"table:file_tag_relation, do:true"`
	Id        interface{} //
	FileId    interface{} // 文件ID
	TagId     interface{} // 标签ID
	CreatedAt *gtime.Time // 关联创建时间
}
