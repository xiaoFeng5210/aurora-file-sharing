// =================================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// =================================================================================

package download

import (
	"context"

	"aurora-file-sharing/api/download/v1"
)

type IDownloadV1 interface {
	Download(ctx context.Context, req *v1.DownloadReq) (res *v1.DownloadRes, err error)
}
