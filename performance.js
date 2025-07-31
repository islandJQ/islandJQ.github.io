// 性能优化脚本
(function() {
    'use strict';
    
    // 预加载关键资源
    function preloadCriticalResources() {
        const criticalResources = [
            'project-detail.html',
            'contact-form.html'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = resource;
            document.head.appendChild(link);
        });
    }
    
    // 延迟加载非关键CSS
    function loadNonCriticalCSS() {
        const nonCriticalCSS = [
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
        ];
        
        nonCriticalCSS.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.media = 'print';
            link.onload = function() {
                this.media = 'all';
            };
            document.head.appendChild(link);
        });
    }
    
    // 字体加载优化
    function optimizeFontLoading() {
        if ('fonts' in document) {
            // 预加载关键字体
            const font = new FontFace('DIN Next LT Pro', 
                'url(https://fonts.googleapis.com/css2?family=DIN+Next+LT+Pro:wght@300;400;600&display=swap)');
            
            font.load().then(function(loadedFont) {
                document.fonts.add(loadedFont);
            }).catch(function(error) {
                console.log('Font loading failed:', error);
            });
        }
    }
    
    // 图片懒加载增强
    function enhanceImageLoading() {
        // 添加图片占位符
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.complete) {
                img.style.backgroundColor = '#f5f5f5';
                img.addEventListener('load', function() {
                    this.style.backgroundColor = 'transparent';
                });
            }
        });
        
        // 为未来的图片添加 loading="lazy"
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.tagName === 'IMG') {
                        node.loading = 'lazy';
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // 减少重排和重绘
    function optimizeAnimations() {
        // 使用 transform 代替 top/left
        const elementsToOptimize = document.querySelectorAll('.work-item, .btn, .news-item');
        elementsToOptimize.forEach(el => {
            el.style.willChange = 'transform';
        });
        
        // 清理不必要的 will-change
        setTimeout(() => {
            elementsToOptimize.forEach(el => {
                el.style.willChange = 'auto';
            });
        }, 3000);
    }
    
    // 内存管理
    function manageMemory() {
        // 清理事件监听器
        window.addEventListener('beforeunload', function() {
            // 移除自定义鼠标光标
            const cursor = document.querySelector('.custom-cursor');
            if (cursor) {
                cursor.remove();
            }
            
            // 清理 Intersection Observer
            if (window.imageObserver) {
                window.imageObserver.disconnect();
            }
        });
    }
    
    // 缓存优化
    function setupCaching() {
        // Service Worker 注册
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                        console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }
    
    // Critical Resource Hints
    function addResourceHints() {
        const hints = [
            { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
            { rel: 'dns-prefetch', href: 'https://cdnjs.cloudflare.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
        ];
        
        hints.forEach(hint => {
            const link = document.createElement('link');
            Object.keys(hint).forEach(key => {
                link.setAttribute(key, hint[key]);
            });
            document.head.appendChild(link);
        });
    }
    
    // 网络状态适配
    function adaptToNetworkConditions() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            // 在慢速网络下禁用某些动画
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                document.body.classList.add('reduced-motion');
                
                // 添加简化样式
                const style = document.createElement('style');
                style.textContent = `
                    .reduced-motion * {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                `;
                document.head.appendChild(style);
            }
            
            // 监听网络变化
            connection.addEventListener('change', function() {
                console.log('Network condition changed:', connection.effectiveType);
            });
        }
    }
    
    // 初始化性能优化
    function initPerformanceOptimizations() {
        // 延迟执行非关键优化
        requestIdleCallback(() => {
            preloadCriticalResources();
            addResourceHints();
            enhanceImageLoading();
            optimizeAnimations();
            manageMemory();
            adaptToNetworkConditions();
        }, { timeout: 2000 });
        
        // 立即执行关键优化
        setupCaching();
    }
    
    // 页面完全加载后执行
    if (document.readyState === 'complete') {
        initPerformanceOptimizations();
    } else {
        window.addEventListener('load', initPerformanceOptimizations);
    }
    
    // Web Vitals 监控
    function monitorWebVitals() {
        // 监控 LCP (Largest Contentful Paint)
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('LCP:', entry.startTime);
            }
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // 监控 FID (First Input Delay)
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('FID:', entry.processingStart - entry.startTime);
            }
        }).observe({ entryTypes: ['first-input'] });
        
        // 监控 CLS (Cumulative Layout Shift)
        let clsValue = 0;
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    console.log('CLS:', clsValue);
                }
            }
        }).observe({ entryTypes: ['layout-shift'] });
    }
    
    // 开发环境下监控性能
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('github.io')) {
        monitorWebVitals();
    }
})();