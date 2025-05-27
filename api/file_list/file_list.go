// =================================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package file_list

import (
	"context"

	"aurora-file-sharing/api/file_list/v1"
)

type IFileListV1 interface {
	FileList(ctx context.Context, req *v1.FileListReq) (res *v1.FileListRes, err error)
	FileCreate(ctx context.Context, req *v1.FileCreateReq) (res *v1.FileCreateRes, err error)
	FileDelete(ctx context.Context, req *v1.FileDeleteReq) (res *v1.FileDeleteRes, err error)
}
