# 图片优化指南

## 推荐的图片格式

1. **AVIF** - 最新格式，压缩率最高
2. **WebP** - 较好的压缩率，广泛支持
3. **JPEG** - 适合照片
4. **PNG** - 适合需要透明度的图片
5. **SVG** - 适合图标和简单图形

## 图片优化工具

### 在线工具
- [Squoosh](https://squoosh.app/) - Google 的图片优化工具
- [TinyPNG](https://tinypng.com/) - PNG/JPEG 压缩
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - SVG 优化

### 命令行工具

```bash
# 安装 imagemin
npm install -g imagemin-cli imagemin-webp imagemin-avif

# 批量转换为 WebP
imagemin images/*.jpg --plugin=webp --out-dir=images/webp

# 批量转换为 AVIF
imagemin images/*.jpg --plugin=avif --out-dir=images/avif

# 使用 cwebp (Google 工具)
brew install webp
cwebp -q 80 input.jpg -o output.webp

# 使用 avifenc
brew install libavif
avifenc input.jpg output.avif
```

## 响应式图片实现

### 1. 使用 picture 元素

```html
<picture>
  <source type="image/avif" srcset="image.avif">
  <source type="image/webp" srcset="image.webp">
  <img src="image.jpg" alt="描述" loading="lazy">
</picture>
```

### 2. 使用 srcset

```html
<img 
  src="image-400.jpg"
  srcset="image-400.jpg 400w,
          image-800.jpg 800w,
          image-1200.jpg 1200w"
  sizes="(max-width: 400px) 100vw,
         (max-width: 800px) 50vw,
         33vw"
  alt="描述"
  loading="lazy"
>
```

### 3. 使用数据属性（配合 image-optimizer.js）

```html
<img 
  data-src="image.jpg"
  data-srcset="image-400.jpg 400w, image-800.jpg 800w"
  data-sizes='{"400": "image-mobile.jpg", "800": "image-tablet.jpg", "default": "image-desktop.jpg"}'
  data-placeholder="image-placeholder.jpg"
  data-width="1200"
  data-height="800"
  alt="描述"
  class="lazy-image"
>
```

## 最佳实践

1. **设置图片尺寸**：避免布局偏移
   ```html
   <img width="800" height="600" src="image.jpg" alt="">
   ```

2. **使用合适的压缩质量**
   - JPEG: 75-85
   - WebP: 80-90
   - AVIF: 60-80

3. **为不同设备提供不同尺寸**
   - 移动设备: 最大 800px 宽
   - 平板: 最大 1200px 宽
   - 桌面: 最大 1920px 宽

4. **使用 CDN**
   - 考虑使用 Cloudflare、jsDelivr 等 CDN
   - 自动优化和缓存

## 批量优化脚本

创建 `optimize-images.sh`:

```bash
#!/bin/bash

# 创建输出目录
mkdir -p images/optimized/{jpg,webp,avif}

# 优化 JPEG
for img in images/original/*.jpg; do
  filename=$(basename "$img")
  # 压缩 JPEG
  jpegoptim --max=85 --strip-all --dest=images/optimized/jpg "$img"
  # 转换为 WebP
  cwebp -q 85 "$img" -o "images/optimized/webp/${filename%.jpg}.webp"
  # 转换为 AVIF
  avifenc "$img" "images/optimized/avif/${filename%.jpg}.avif"
done

# 优化 PNG
for img in images/original/*.png; do
  filename=$(basename "$img")
  # 压缩 PNG
  pngquant --quality=65-80 "$img" --output "images/optimized/png/$filename"
  # 转换为 WebP
  cwebp -q 85 "$img" -o "images/optimized/webp/${filename%.png}.webp"
done
```

## 监控图片性能

在浏览器控制台运行：

```javascript
// 检查所有图片的加载情况
const images = document.querySelectorAll('img');
images.forEach(img => {
  console.log({
    src: img.src,
    loaded: img.complete,
    naturalSize: `${img.naturalWidth}x${img.naturalHeight}`,
    displaySize: `${img.width}x${img.height}`,
    loading: img.loading
  });
});

// 计算图片总大小
performance.getEntriesByType('resource')
  .filter(entry => entry.initiatorType === 'img')
  .reduce((total, entry) => {
    console.log(`${entry.name}: ${(entry.transferSize / 1024).toFixed(2)}KB`);
    return total + entry.transferSize;
  }, 0) / 1024 / 1024 + 'MB';
```