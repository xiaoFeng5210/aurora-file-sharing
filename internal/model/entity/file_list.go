// =================================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package entity

import (
	"github.com/gogf/gf/v2/os/gtime"
)

// FileList is the golang structure for table file_list.
type FileList struct {
	Id            int         `json:"id"            orm:"id"              description:"主键"` //
	FileId        string      `json:"fileId"        orm:"file_id"         description:"文件ID"` //
	FileName      string      `json:"fileName"      orm:"file_name"       description:"文件名称"` //
	FileSize      int64       `json:"fileSize"      orm:"file_size"       description:"文件大小"` //
	FileType      string      `json:"fileType"      orm:"file_type"       description:"文件类型"` //
	FileLocalPath string      `json:"fileLocalPath" orm:"file_local_path" description:"本地路径"` //
	FileOssPath   string      `json:"fileOssPath"   orm:"file_oss_path"   description:"OSS路径"` //
	CreatedAt     *gtime.Time `json:"createdAt"     orm:"created_at"      description:"创建时间"` //
	UpdatedAt     *gtime.Time `json:"updatedAt"     orm:"updated_at"      description:"更新时间"` //
	TagId         string      `json:"tagId"         orm:"tag_id"          description:"标签ID"` //
}
