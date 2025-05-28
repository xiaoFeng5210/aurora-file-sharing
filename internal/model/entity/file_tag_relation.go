// =================================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package entity

import (
	"github.com/gogf/gf/v2/os/gtime"
)

// FileTagRelation is the golang structure for table file_tag_relation.
type FileTagRelation struct {
	Id        int         `json:"id"        orm:"id"         description:""`       //
	FileId    string      `json:"fileId"    orm:"file_id"    description:"文件ID"`   // 文件ID
	TagId     string      `json:"tagId"     orm:"tag_id"     description:"标签ID"`   // 标签ID
	CreatedAt *gtime.Time `json:"createdAt" orm:"created_at" description:"关联创建时间"` // 关联创建时间
}
