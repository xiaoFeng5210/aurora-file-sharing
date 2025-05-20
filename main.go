package main

import (
	_ "aurora-file-sharing/internal/packed"

	"github.com/gogf/gf/v2/os/gctx"

	"aurora-file-sharing/internal/cmd"
)

func main() {
	cmd.Main.Run(gctx.GetInitCtx())
}
