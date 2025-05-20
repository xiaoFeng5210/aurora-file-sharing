// ==========================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// ==========================================================================

package internal

import (
	"context"

	"github.com/gogf/gf/v2/database/gdb"
	"github.com/gogf/gf/v2/frame/g"
)

// FileListDao is the data access object for the table file_list.
type FileListDao struct {
	table    string             // table is the underlying table name of the DAO.
	group    string             // group is the database configuration group name of the current DAO.
	columns  FileListColumns    // columns contains all the column names of Table for convenient usage.
	handlers []gdb.ModelHandler // handlers for customized model modification.
}

// FileListColumns defines and stores column names for the table file_list.
type FileListColumns struct {
	Id            string //
	FileId        string //
	FileName      string //
	FileSize      string //
	FileType      string //
	FileLocalPath string //
	FileOssPath   string //
	CreatedAt     string //
	UpdatedAt     string //
	TagId         string //
}

// fileListColumns holds the columns for the table file_list.
var fileListColumns = FileListColumns{
	Id:            "id",
	FileId:        "file_id",
	FileName:      "file_name",
	FileSize:      "file_size",
	FileType:      "file_type",
	FileLocalPath: "file_local_path",
	FileOssPath:   "file_oss_path",
	CreatedAt:     "created_at",
	UpdatedAt:     "updated_at",
	TagId:         "tag_id",
}

// NewFileListDao creates and returns a new DAO object for table data access.
func NewFileListDao(handlers ...gdb.ModelHandler) *FileListDao {
	return &FileListDao{
		group:    "default",
		table:    "file_list",
		columns:  fileListColumns,
		handlers: handlers,
	}
}

// DB retrieves and returns the underlying raw database management object of the current DAO.
func (dao *FileListDao) DB() gdb.DB {
	return g.DB(dao.group)
}

// Table returns the table name of the current DAO.
func (dao *FileListDao) Table() string {
	return dao.table
}

// Columns returns all column names of the current DAO.
func (dao *FileListDao) Columns() FileListColumns {
	return dao.columns
}

// Group returns the database configuration group name of the current DAO.
func (dao *FileListDao) Group() string {
	return dao.group
}

// Ctx creates and returns a Model for the current DAO. It automatically sets the context for the current operation.
func (dao *FileListDao) Ctx(ctx context.Context) *gdb.Model {
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
func (dao *FileListDao) Transaction(ctx context.Context, f func(ctx context.Context, tx gdb.TX) error) (err error) {
	return dao.Ctx(ctx).Transaction(ctx, f)
}
