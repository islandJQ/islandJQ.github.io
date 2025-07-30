# 图片上传指南

## 📁 文件夹结构
```
images/
└── works/
    ├── branding/     (品牌设计)
    ├── print/        (印刷设计)
    ├── digital/      (数字设计)
    ├── illustration/ (插画设计)
    ├── packaging/    (包装设计)
    └── web/          (网页设计)
```

## 📸 图片要求

### 文件命名
- 第一张作品：`project1.jpg`
- 第二张作品：`project2.jpg`
- 第三张作品：`project3.jpg`
- 以此类推...

### 图片规格
- **尺寸**：建议 800x600px 或 16:9 比例
- **格式**：JPG 或 PNG
- **文件大小**：每张控制在 500KB 以内
- **质量**：高清晰度，适合网络展示

## 🚀 上传步骤

### 方法1：GitHub网页上传
1. 访问 GitHub 仓库：https://github.com/islandJQ/islandJQ.github.io
2. 进入对应的文件夹（如 `images/works/branding/`）
3. 点击 "Add file" → "Upload files"
4. 拖拽图片文件到页面
5. 填写提交信息，点击 "Commit changes"

### 方法2：本地上传
1. 将图片文件放入对应的本地文件夹
2. 使用 Git 命令提交：
   ```bash
   git add images/
   git commit -m "Add portfolio images"
   git push origin main
   ```

## 🎨 添加更多作品

如果需要添加更多作品，请：
1. 将新图片放入对应分类文件夹
2. 修改 `index.html` 文件，复制现有的 work-item 结构
3. 更新图片路径和作品信息

## 💡 提示
- 上传图片后，网站会在几分钟内自动更新
- 如果图片显示有问题，请检查文件名和路径是否正确
- 建议先上传一张测试图片，确认效果后再批量上传

---
*需要帮助？随时联系我进行技术支持！*