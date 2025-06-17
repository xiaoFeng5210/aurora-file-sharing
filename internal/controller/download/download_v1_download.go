package download

import (
	"context"

	v1 "aurora-file-sharing/api/download/v1"
	"aurora-file-sharing/internal/service"
)

func (c *ControllerV1) Download(ctx context.Context, req *v1.DownloadReq) (res *v1.DownloadRes, err error) {
	res, err = service.DownloadFile(ctx, req.FileId)
	if err != nil {
		return nil, err
	}
	return res, nil
}
