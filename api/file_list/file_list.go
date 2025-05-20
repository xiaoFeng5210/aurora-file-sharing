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
}
