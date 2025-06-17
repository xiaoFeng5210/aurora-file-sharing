package service

import (
	"fmt"
	"testing"

	"context"

	"github.com/gogf/gf/v2/test/gtest"
)

var (
	testFileId = "5ipfna0n9n0daonzh1i9hk84006dwbbp"
)

func TestDownloadFile(t *testing.T) {
	gtest.C(t, func(t *gtest.T) {
		res, err := DownloadFile(context.Background(), testFileId)
		fmt.Println(res, err)
	})
}
