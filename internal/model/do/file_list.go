// =================================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package do

import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/os/gtime"
)

// FileList is the golang structure of table file_list for DAO operations like Where/Data.
type FileList struct {
	g.Meta        `orm:"table:file_list, do:true"`
	Id            interface{} //
	FileId        interface{} //
	FileName      interface{} //
	FileSize      interface{} //
	FileType      interface{} //
	FileLocalPath interface{} //
	FileOssPath   interface{} //
	CreatedAt     *gtime.Time //
	UpdatedAt     *gtime.Time //
	TagId         interface{} //
}
