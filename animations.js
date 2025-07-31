// 页面加载和动画控制
(function() {
    'use strict';
    
    // 页面加载器
    function hideLoader() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 600);
        }
    }
    
    // 检查页面是否加载完成
    window.addEventListener('load', function() {
        // 最少显示加载动画1秒，避免闪烁
        setTimeout(hideLoader, 1000);
    });
    
    // 如果3秒后还没加载完，也隐藏加载器
    setTimeout(hideLoader, 3000);
    
    // 页面过渡动画
    function showPageTransition() {
        const transition = document.getElementById('page-transition');
        if (transition) {
            transition.classList.add('active');
            setTimeout(() => {
                transition.classList.remove('active');
            }, 1000);
        }
    }
    
    // 为所有内部链接添加过渡效果
    document.addEventListener('DOMContentLoaded', function() {
        const internalLinks = document.querySelectorAll('a[href^="project-detail.html"]');
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                showPageTransition();
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            });
        });
    });
    
    // 滚动显示动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // 如果是作品网格中的项目，添加交错动画
                if (entry.target.classList.contains('work-item')) {
                    const workItems = document.querySelectorAll('.work-item');
                    const index = Array.from(workItems).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    document.addEventListener('DOMContentLoaded', function() {
        const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
        animatedElements.forEach(el => observer.observe(el));
    });
    
    // 平滑滚动增强
    function smoothScroll(target, duration = 1000) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 70;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // 缓动函数
            const ease = progress < 0.5 
                ? 4 * progress * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
    
    // 增强的滚动触发动画
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateScrollAnimations() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
        
        // 导航栏滚动效果
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (scrollTop > 100) {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        }
        
        // 视差效果增强
        const hero = document.querySelector('.hero');
        if (hero && scrollTop < window.innerHeight) {
            hero.style.transform = `translateY(${scrollTop * 0.5}px)`;
            hero.style.opacity = 1 - (scrollTop / window.innerHeight) * 0.3;
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollAnimations);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // 移动端触摸优化
    if ('ontouchstart' in window) {
        // 移动端特殊处理
        document.body.classList.add('touch-device');
        
        // 移除鼠标相关的动画
        const style = document.createElement('style');
        style.textContent = `
            .touch-device .work-item:hover {
                transform: none;
            }
            
            .touch-device .btn:hover::before {
                display: none;
            }
        `;
        document.head.appendChild(style);
        
        // 添加触摸反馈
        const touchElements = document.querySelectorAll('.work-item, .btn, .contact-link');
        touchElements.forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            el.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
    
    // 鼠标跟随效果（仅桌面端）
    if (window.innerWidth > 768 && !('ontouchstart' in window)) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = '<div class="cursor-dot"></div>';
        document.body.appendChild(cursor);
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .custom-cursor {
                position: fixed;
                pointer-events: none;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .custom-cursor.visible {
                opacity: 1;
            }
            
            .cursor-dot {
                width: 8px;
                height: 8px;
                background: #000;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                transition: all 0.15s ease;
            }
            
            .custom-cursor.hover .cursor-dot {
                width: 40px;
                height: 40px;
                background: rgba(0, 0, 0, 0.1);
                border: 2px solid #000;
            }
        `;
        document.head.appendChild(style);
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.classList.add('visible');
        });
        
        // 平滑跟随
        function animateCursor() {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.2;
            cursorY += dy * 0.2;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // 悬停效果
        const hoverElements = document.querySelectorAll('a, button, .work-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
        
        // 隐藏默认光标
        document.body.style.cursor = 'none';
        document.querySelectorAll('a, button').forEach(el => {
            el.style.cursor = 'none';
        });
    }
    
    // 图片懒加载优化
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // 添加加载动画
                img.style.opacity = '0';
                img.style.transform = 'scale(0.95)';
                
                img.onload = function() {
                    img.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                };
                
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
})();