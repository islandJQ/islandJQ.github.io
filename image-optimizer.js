// 高级图片优化脚本
(function() {
    'use strict';
    
    // 支持 WebP/AVIF 检测
    const supportsWebP = (function() {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('image/webp') === 0;
    })();
    
    const supportsAVIF = new Promise(resolve => {
        const avif = new Image();
        avif.onload = avif.onerror = () => resolve(avif.height === 2);
        avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    });
    
    // 响应式图片加载器
    class ResponsiveImageLoader {
        constructor() {
            this.imageCache = new Map();
            this.observer = null;
            this.init();
        }
        
        init() {
            // 创建 Intersection Observer
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            // 观察所有图片
            this.observeImages();
            
            // 监听窗口大小变化
            this.handleResize();
        }
        
        observeImages() {
            const images = document.querySelectorAll('img[data-src], img[data-srcset]');
            images.forEach(img => this.observer.observe(img));
        }
        
        async loadImage(img) {
            const src = img.dataset.src;
            const srcset = img.dataset.srcset;
            
            if (!src && !srcset) return;
            
            // 检查缓存
            const cacheKey = src || srcset;
            if (this.imageCache.has(cacheKey)) {
                this.applyImage(img, this.imageCache.get(cacheKey));
                return;
            }
            
            // 添加加载状态
            img.classList.add('loading');
            
            try {
                // 预加载图片
                const imageData = await this.preloadImage(src, srcset);
                
                // 缓存结果
                this.imageCache.set(cacheKey, imageData);
                
                // 应用图片
                this.applyImage(img, imageData);
                
            } catch (error) {
                console.error('Image loading failed:', error);
                img.classList.add('error');
                
                // 显示占位图
                if (img.dataset.placeholder) {
                    img.src = img.dataset.placeholder;
                }
            }
            
            // 停止观察已加载的图片
            this.observer.unobserve(img);
        }
        
        preloadImage(src, srcset) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                
                img.onload = () => resolve({ src: img.src, srcset });
                img.onerror = reject;
                
                if (srcset) {
                    img.srcset = srcset;
                }
                if (src) {
                    img.src = src;
                }
            });
        }
        
        applyImage(img, imageData) {
            // 淡入效果
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease-in-out';
            
            if (imageData.srcset) {
                img.srcset = imageData.srcset;
            }
            if (imageData.src) {
                img.src = imageData.src;
            }
            
            img.onload = () => {
                img.classList.remove('loading');
                img.classList.add('loaded');
                img.style.opacity = '1';
                
                // 清理内联样式
                setTimeout(() => {
                    img.style.opacity = '';
                    img.style.transition = '';
                }, 300);
            };
        }
        
        handleResize() {
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    // 重新评估图片尺寸需求
                    this.updateImageSources();
                }, 250);
            });
        }
        
        updateImageSources() {
            const images = document.querySelectorAll('img[data-sizes]');
            images.forEach(img => {
                const sizes = JSON.parse(img.dataset.sizes);
                const width = window.innerWidth;
                
                // 根据屏幕宽度选择合适的图片
                let selectedSize = sizes.default;
                for (const [breakpoint, source] of Object.entries(sizes)) {
                    if (breakpoint !== 'default' && width <= parseInt(breakpoint)) {
                        selectedSize = source;
                        break;
                    }
                }
                
                if (img.src !== selectedSize) {
                    img.src = selectedSize;
                }
            });
        }
    }
    
    // 创建 Picture 元素以支持现代格式
    function createPictureElement(img) {
        const picture = document.createElement('picture');
        const src = img.dataset.src || img.src;
        
        // 获取文件名和扩展名
        const lastDot = src.lastIndexOf('.');
        const baseName = src.substring(0, lastDot);
        const ext = src.substring(lastDot + 1);
        
        // AVIF source
        if (supportsAVIF) {
            const avifSource = document.createElement('source');
            avifSource.type = 'image/avif';
            avifSource.srcset = `${baseName}.avif`;
            picture.appendChild(avifSource);
        }
        
        // WebP source
        if (supportsWebP) {
            const webpSource = document.createElement('source');
            webpSource.type = 'image/webp';
            webpSource.srcset = `${baseName}.webp`;
            picture.appendChild(webpSource);
        }
        
        // 原始格式作为后备
        img.parentNode.insertBefore(picture, img);
        picture.appendChild(img);
        
        return picture;
    }
    
    // 添加模糊占位符
    function addBlurredPlaceholder(img) {
        if (!img.dataset.placeholder) return;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'image-wrapper';
        wrapper.style.position = 'relative';
        wrapper.style.overflow = 'hidden';
        
        const placeholder = document.createElement('img');
        placeholder.src = img.dataset.placeholder;
        placeholder.className = 'image-placeholder';
        placeholder.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            filter: blur(20px);
            transform: scale(1.1);
            transition: opacity 0.3s ease-out;
        `;
        
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(placeholder);
        wrapper.appendChild(img);
        
        img.addEventListener('load', () => {
            placeholder.style.opacity = '0';
            setTimeout(() => placeholder.remove(), 300);
        });
    }
    
    // 初始化
    document.addEventListener('DOMContentLoaded', () => {
        // 启动响应式图片加载器
        new ResponsiveImageLoader();
        
        // 为现有图片添加优化
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // 添加 loading 属性
            if (!img.loading) {
                img.loading = 'lazy';
            }
            
            // 添加模糊占位符
            if (img.dataset.placeholder) {
                addBlurredPlaceholder(img);
            }
            
            // 设置图片尺寸避免布局偏移
            if (!img.width && img.dataset.width) {
                img.width = img.dataset.width;
            }
            if (!img.height && img.dataset.height) {
                img.height = img.dataset.height;
            }
        });
    });
    
    // 导出给全局使用
    window.ResponsiveImageLoader = ResponsiveImageLoader;
})();