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


-- 文件标签关联表（多对多关系）
CREATE TABLE IF NOT EXISTS file_tag_relation (
  id SERIAL PRIMARY KEY,
  file_id VARCHAR(255) NOT NULL,
  tag_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- 唯一约束，一个文件只能有一对，避免数据冗余
  UNIQUE(file_id, tag_id)
);
-- mysql组合唯一约束 UNIQUE KEY uk_file_tag (file_id, tag_id)

COMMENT ON TABLE file_tag_relation IS '文件和标签的多对多关联表';
COMMENT ON COLUMN file_tag_relation.file_id IS '文件ID';
COMMENT ON COLUMN file_tag_relation.tag_id IS '标签ID';
COMMENT ON COLUMN file_tag_relation.created_at IS '关联创建时间';

-- 创建索引提高查询性能
CREATE INDEX IF NOT EXISTS idx_file_tag_file_id ON file_tag_relation(file_id);
CREATE INDEX IF NOT EXISTS idx_file_tag_tag_id ON file_tag_relation(tag_id);

-- 添加外键约束（可选，确保数据完整性）
-- ALTER TABLE file_tag_relation ADD CONSTRAINT fk_file_tag_file_id 
--   FOREIGN KEY (file_id) REFERENCES file_list(file_id) ON DELETE CASCADE;
-- ALTER TABLE file_tag_relation ADD CONSTRAINT fk_file_tag_tag_id 
--   FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE;







