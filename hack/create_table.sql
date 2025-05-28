-- 进入postgres
psql -U zhangqingfeng -d file_db

-- 文件列表
CREATE TABLE IF NOT EXISTS file_list (
  id SERIAL PRIMARY KEY,
  file_id VARCHAR(255) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_size BIGINT NOT NULL,
  file_type VARCHAR(255) NOT NULL,
  file_local_path VARCHAR(255) NOT NULL,
  file_oss_path VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  tag_id VARCHAR(255)
);

COMMENT ON COLUMN file_list.file_local_path IS '文件在服务器上的路径';
COMMENT ON COLUMN file_list.file_oss_path IS '文件在oss上的路径';
COMMENT ON COLUMN file_list.created_at IS '创建时间';
COMMENT ON COLUMN file_list.updated_at IS '更新时间';
COMMENT ON COLUMN file_list.tag_id IS '标签id';

CREATE INDEX IF NOT EXISTS idx_file_id ON file_list(file_id);
CREATE INDEX IF NOT EXISTS idx_tag_id ON file_list(tag_id);



-- 标签管理
CREATE TABLE IF NOT EXISTS tags (
  id SERIAL PRIMARY KEY,
  tag_id VARCHAR(255) NOT NULL,
  tag_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON COLUMN tags.tag_id IS '标签id';
COMMENT ON COLUMN tags.tag_name IS '标签名称';
COMMENT ON COLUMN tags.created_at IS '创建时间';
COMMENT ON COLUMN tags.updated_at IS '更新时间';

CREATE INDEX IF NOT EXISTS idx_tag_id ON tags(tag_id);







