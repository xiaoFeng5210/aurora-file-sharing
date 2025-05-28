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
}
