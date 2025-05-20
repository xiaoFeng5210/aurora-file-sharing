// =================================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package entity

import (
	"github.com/gogf/gf/v2/os/gtime"
)

// FileList is the golang structure for table file_list.
type FileList struct {
	Id            int         `json:"id"            orm:"id"              description:""` //
	FileId        string      `json:"fileId"        orm:"file_id"         description:""` //
	FileName      string      `json:"fileName"      orm:"file_name"       description:""` //
	FileSize      int64       `json:"fileSize"      orm:"file_size"       description:""` //
	FileType      string      `json:"fileType"      orm:"file_type"       description:""` //
	FileLocalPath string      `json:"fileLocalPath" orm:"file_local_path" description:""` //
	FileOssPath   string      `json:"fileOssPath"   orm:"file_oss_path"   description:""` //
	CreatedAt     *gtime.Time `json:"createdAt"     orm:"created_at"      description:""` //
	UpdatedAt     *gtime.Time `json:"updatedAt"     orm:"updated_at"      description:""` //
	TagId         string      `json:"tagId"         orm:"tag_id"          description:""` //
}
