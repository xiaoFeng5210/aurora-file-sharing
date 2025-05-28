// =================================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package tags

import (
	"context"

	"aurora-file-sharing/api/tags/v1"
)

type ITagsV1 interface {
	Tags(ctx context.Context, req *v1.TagsReq) (res *v1.TagsRes, err error)
	TagsCreate(ctx context.Context, req *v1.TagsCreateReq) (res *v1.TagsCreateRes, err error)
	Delete(ctx context.Context, req *v1.DeleteReq) (res *v1.DeleteRes, err error)
}
