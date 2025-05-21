package cmd

import (
	"context"

	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/net/ghttp"
	"github.com/gogf/gf/v2/os/gcmd"

	"aurora-file-sharing/internal/controller/file_list"
	"aurora-file-sharing/internal/controller/hello"
)

const (
	MySwaggerUITemplate = `
	<!doctype html>
<html>
  <head>
    <title>Scalar API Reference</title>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <!-- Need a Custom Header? Check out this example https://codepen.io/scalarorg/pen/VwOXqam -->
    <script
      id="api-reference"
      data-url="{SwaggerUIDocUrl}"></script>
    <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
  </body>
</html>
`
)

func MiddlewareCORS(r *ghttp.Request) {
	r.Response.CORSDefault()
	r.Middleware.Next()
}

var (
	Main = gcmd.Command{
		Name:  "main",
		Usage: "main",
		Brief: "start http server",
		Func: func(ctx context.Context, parser *gcmd.Parser) (err error) {
			s := g.Server()
			s.Group("/", func(group *ghttp.RouterGroup) {
				group.Middleware(ghttp.MiddlewareHandlerResponse)
				group.Bind(
					hello.NewV1(),
					file_list.NewV1(),
				)
			})

			s.Group("/upload", func(group *ghttp.RouterGroup) {
				// 使用解决跨域的中间件
				group.Middleware(MiddlewareCORS)
				group.POST("/", file_list.FileUpload)
			})
			s.SetSwaggerUITemplate(MySwaggerUITemplate)
			s.Run()
			return nil
		},
	}
)
