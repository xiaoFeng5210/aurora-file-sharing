package main

import (
	_ "service/internal/packed"

	"github.com/gogf/gf/v2/os/gctx"

	"service/internal/cmd"
)

func main() {
	cmd.Main.Run(gctx.GetInitCtx())
}
