// =================================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package entity

import (
	"github.com/gogf/gf/v2/os/gtime"
)

// Tags is the golang structure for table tags.
type Tags struct {
	Id        int         `json:"id"        orm:"id"         description:""`     //
	TagId     string      `json:"tagId"     orm:"tag_id"     description:"标签id"` // 标签id
	TagName   string      `json:"tagName"   orm:"tag_name"   description:"标签名称"` // 标签名称
	CreatedAt *gtime.Time `json:"createdAt" orm:"created_at" description:"创建时间"` // 创建时间
	UpdatedAt *gtime.Time `json:"updatedAt" orm:"updated_at" description:"更新时间"` // 更新时间
}
