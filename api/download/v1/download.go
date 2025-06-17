package v1

import "github.com/gogf/gf/v2/frame/g"

type DownloadReq struct {
	g.Meta `path:"/download" method:"get" tags:"文件管理" summary:"下载文件"`
	FileId string `dc:"文件ID"`
}

type DownloadRes struct {
	FileId string `json:"fileId" dc:"文件ID"`
}
