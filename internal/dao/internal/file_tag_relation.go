// ==========================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// ==========================================================================

package internal

import (
	"context"

	"github.com/gogf/gf/v2/database/gdb"
	"github.com/gogf/gf/v2/frame/g"
)

// FileTagRelationDao is the data access object for the table file_tag_relation.
type FileTagRelationDao struct {
	table    string                 // table is the underlying table name of the DAO.
	group    string                 // group is the database configuration group name of the current DAO.
	columns  FileTagRelationColumns // columns contains all the column names of Table for convenient usage.
	handlers []gdb.ModelHandler     // handlers for customized model modification.
}

// FileTagRelationColumns defines and stores column names for the table file_tag_relation.
type FileTagRelationColumns struct {
	Id        string //
	FileId    string // 文件ID
	TagId     string // 标签ID
	CreatedAt string // 关联创建时间
}

// fileTagRelationColumns holds the columns for the table file_tag_relation.
var fileTagRelationColumns = FileTagRelationColumns{
	Id:        "id",
	FileId:    "file_id",
	TagId:     "tag_id",
	CreatedAt: "created_at",
}

// NewFileTagRelationDao creates and returns a new DAO object for table data access.
func NewFileTagRelationDao(handlers ...gdb.ModelHandler) *FileTagRelationDao {
	return &FileTagRelationDao{
		group:    "default",
		table:    "file_tag_relation",
		columns:  fileTagRelationColumns,
		handlers: handlers,
	}
}

// DB retrieves and returns the underlying raw database management object of the current DAO.
func (dao *FileTagRelationDao) DB() gdb.DB {
	return g.DB(dao.group)
}

// Table returns the table name of the current DAO.
func (dao *FileTagRelationDao) Table() string {
	return dao.table
}

// Columns returns all column names of the current DAO.
func (dao *FileTagRelationDao) Columns() FileTagRelationColumns {
	return dao.columns
}

// Group returns the database configuration group name of the current DAO.
func (dao *FileTagRelationDao) Group() string {
	return dao.group
}

// Ctx creates and returns a Model for the current DAO. It automatically sets the context for the current operation.
func (dao *FileTagRelationDao) Ctx(ctx context.Context) *gdb.Model {
	model := dao.DB().Model(dao.table)
	for _, handler := range dao.handlers {
		model = handler(model)
	}
	return model.Safe().Ctx(ctx)
}

// Transaction wraps the transaction logic using function f.
// It rolls back the transaction and returns the error if function f returns a non-nil error.
// It commits the transaction and returns nil if function f returns nil.
//
// Note: Do not commit or roll back the transaction in function f,
// as it is automatically handled by this function.
func (dao *FileTagRelationDao) Transaction(ctx context.Context, f func(ctx context.Context, tx gdb.TX) error) (err error) {
	return dao.Ctx(ctx).Transaction(ctx, f)
}
