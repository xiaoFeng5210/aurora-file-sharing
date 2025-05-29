// =================================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package file_tag_relation

import (
	"context"

	"aurora-file-sharing/api/file_tag_relation/v1"
)

type IFileTagRelationV1 interface {
	GetAllTagsByFileId(ctx context.Context, req *v1.GetAllTagsByFileIdReq) (res *v1.GetAllTagsByFileIdRes, err error)
}
