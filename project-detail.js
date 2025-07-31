// 项目详情页JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 获取URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id') || 'default';
    
    // 项目数据
    const projectsData = {
        'branding-1': {
            title: '品牌视觉设计',
            client: '创新科技有限公司',
            category: '品牌设计 / VI设计',
            date: '2024年3月',
            team: 'islandJQ Design Studio',
            overview: '为新兴科技公司打造的全新品牌视觉识别系统。项目涵盖了从标志设计到完整的VI手册，' +
                     '确保品牌在各个触点上保持一致性和专业性。设计理念融合了科技感与人文关怀，' +
                     '体现了公司"科技改变生活"的核心价值观。通过简约而富有表现力的视觉语言，' +
                     '成功帮助客户在竞争激烈的市场中建立了独特的品牌形象。',
            images: [
                'images/projects/branding1/main.jpg',
                'images/projects/branding1/logo-variations.jpg',
                'images/projects/branding1/business-cards.jpg',
                'images/projects/branding1/stationery.jpg',
                'images/projects/branding1/website-mockup.jpg',
                'images/projects/branding1/signage.jpg',
                'images/projects/branding1/brand-guidelines.jpg'
            ],
            prevProject: 'web-1',
            nextProject: 'packaging-1'
        },
        'packaging-1': {
            title: '包装设计',
            client: '自然茶园',
            category: '包装设计 / 产品设计',
            date: '2024年2月',
            team: 'islandJQ Design Studio',
            overview: '为高端有机茶品牌设计的包装系列。设计灵感来源于中国传统茶文化与现代简约美学的结合。' +
                     '通过精心的材质选择和印刷工艺，营造出优雅而具有品质感的产品形象。' +
                     '整个设计系列强调生态环保理念，使用可再生材料，传递绿色健康的生活方式。',
            images: [
                'images/projects/packaging1/main.jpg',
                'images/projects/packaging1/box-series.jpg',
                'images/projects/packaging1/pattern-design.jpg',
                'images/projects/packaging1/gift-set.jpg',
                'images/projects/packaging1/material-detail.jpg',
                'images/projects/packaging1/store-display.jpg'
            ],
            prevProject: 'branding-1',
            nextProject: 'web-1'
        },
        'web-1': {
            title: '网页设计',
            client: '创意无限工作室',
            category: '网页设计 / UI/UX设计',
            date: '2024年1月',
            team: 'islandJQ Design Studio',
            overview: '为创意工作室设计的响应式网站。采用大胆的版式设计和流畅的交互动画，' +
                     '展现工作室的创意实力。网站不仅美观，更注重用户体验和转化率。' +
                     '特别设计了沉浸式的作品展示方式，让访客能够更好地体验和理解创意作品。',
            images: [
                'images/projects/web1/homepage.jpg',
                'images/projects/web1/portfolio-grid.jpg',
                'images/projects/web1/project-detail.jpg',
                'images/projects/web1/mobile-responsive.jpg',
                'images/projects/web1/interaction-design.jpg',
                'images/projects/web1/loading-animation.jpg'
            ],
            prevProject: 'packaging-1',
            nextProject: 'branding-1'
        },
        'print-1': {
            title: '印刷设计作品',
            client: '文化传媒公司',
            category: '印刷设计 / 平面设计',
            date: '2024年4月',
            team: 'islandJQ Design Studio',
            overview: '专业的印刷设计作品集，包含海报设计、宣传册设计、名片设计等多种印刷媒体。' +
                     '设计注重视觉冲击力与信息传达的平衡，运用简约现代的设计语言，' +
                     '确保每个作品都能在印刷媒体中发挥最佳的视觉效果。',
            images: [
                'images/projects/print1/poster-series.jpg',
                'images/projects/print1/brochure-design.jpg',
                'images/projects/print1/business-card.jpg',
                'images/projects/print1/flyer-design.jpg',
                'images/projects/print1/magazine-layout.jpg'
            ],
            prevProject: 'photography-1',
            nextProject: 'digital-1'
        },
        'digital-1': {
            title: '数字设计项目',
            client: '数字科技公司',
            category: '数字设计 / UI/UX设计',
            date: '2024年3月',
            team: 'islandJQ Design Studio',
            overview: '为数字平台打造的全套视觉设计解决方案。项目涵盖移动应用界面设计、' +
                     '数字广告创意、社交媒体视觉内容等。设计采用现代简约风格，' +
                     '注重用户体验和视觉层次，确保在数字环境中获得最佳的展示效果。',
            images: [
                'images/projects/digital1/app-interface.jpg',
                'images/projects/digital1/digital-ads.jpg',
                'images/projects/digital1/social-media.jpg',
                'images/projects/digital1/banner-design.jpg',
                'images/projects/digital1/icon-system.jpg'
            ],
            prevProject: 'print-1',
            nextProject: 'illustration-1'
        },
        'illustration-1': {
            title: '插画设计',
            client: '出版社',
            category: '插画设计 / 视觉艺术',
            date: '2024年2月',
            team: 'islandJQ Design Studio',
            overview: '原创插画设计作品，风格简约现代，富有表现力。作品应用于书籍封面、' +
                     '杂志插图、品牌视觉等多个领域。插画风格注重线条的简洁性和色彩的和谐性，' +
                     '通过独特的视觉语言传达情感和概念。',
            images: [
                'images/projects/illustration1/book-cover.jpg',
                'images/projects/illustration1/magazine-illustration.jpg',
                'images/projects/illustration1/character-design.jpg',
                'images/projects/illustration1/pattern-design.jpg',
                'images/projects/illustration1/concept-art.jpg'
            ],
            prevProject: 'digital-1',
            nextProject: 'photography-1'
        },
        'photography-1': {
            title: '摄影作品',
            client: '艺术画廊',
            category: '摄影艺术 / 视觉记录',
            date: '2024年1月',
            team: 'islandJQ Design Studio',
            overview: '专业摄影作品集，涵盖产品摄影、建筑摄影、人像摄影等多个领域。' +
                     '摄影风格简洁明快，注重光影的运用和构图的平衡。' +
                     '通过镜头语言展现物体的美感和空间的韵律。',
            images: [
                'images/projects/photography1/product-photography.jpg',
                'images/projects/photography1/architecture.jpg',
                'images/projects/photography1/portrait-series.jpg',
                'images/projects/photography1/still-life.jpg',
                'images/projects/photography1/landscape.jpg'
            ],
            prevProject: 'illustration-1',
            nextProject: 'print-1'
        },
        'default': {
            title: '品牌视觉识别系统设计',
            client: '创新科技有限公司',
            category: '品牌设计 / VI设计',
            date: '2024年3月',
            team: 'islandJQ Design Studio',
            overview: '这是一个充满创意的品牌设计项目。我们为客户打造了全新的视觉识别系统，' +
                     '包括标志设计、色彩系统、字体规范以及各类应用设计。整个设计过程中，' +
                     '我们注重简约现代的设计理念，确保品牌形象既有辨识度又具有时代感。',
            images: [],
            prevProject: null,
            nextProject: null
        }
    };
    
    // 获取当前项目数据
    const currentProject = projectsData[projectId] || projectsData['default'];
    
    // 更新页面内容
    function updateProjectContent() {
        document.getElementById('project-title').textContent = currentProject.title;
        document.getElementById('project-client').textContent = currentProject.client;
        document.getElementById('project-category').textContent = currentProject.category;
        document.getElementById('project-date').textContent = currentProject.date;
        document.getElementById('project-team').textContent = currentProject.team;
        document.getElementById('project-overview').textContent = currentProject.overview;
        
        // 更新页面标题
        document.title = `${currentProject.title} - islandJQ DESIGN STUDIO`;
        
        // 更新图片画廊
        updateGallery();
        
        // 更新项目导航
        updateProjectNavigation();
    }
    
    // 更新图片画廊
    function updateGallery() {
        const gallery = document.getElementById('project-gallery');
        
        if (currentProject.images && currentProject.images.length > 0) {
            gallery.innerHTML = currentProject.images.map((image, index) => `
                <div class="gallery-item">
                    <img src="${image}" alt="${currentProject.title} - 图片${index + 1}" 
                         loading="lazy" onerror="this.src='images/placeholder.jpg'">
                </div>
            `).join('');
        } else {
            // 如果没有真实图片，显示占位符
            gallery.innerHTML = `
                <div class="gallery-item">
                    <div style="height: 600px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
                        项目展示图 1
                    </div>
                </div>
                <div class="gallery-item">
                    <div style="height: 600px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); 
                                display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
                        项目展示图 2
                    </div>
                </div>
                <div class="gallery-item">
                    <div style="height: 600px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); 
                                display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
                        项目展示图 3
                    </div>
                </div>
                <div class="gallery-item">
                    <div style="height: 600px; background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); 
                                display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
                        项目展示图 4
                    </div>
                </div>
                <div class="gallery-item">
                    <div style="height: 600px; background: linear-gradient(135deg, #30cfd0 0%, #330867 100%); 
                                display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
                        项目展示图 5
                    </div>
                </div>
            `;
        }
    }
    
    // 初始化页面
    updateProjectContent();
    
    // 添加导航栏功能
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // 图片懒加载
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // 添加图片灯箱效果
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            createLightbox(this.src, this.alt);
        });
    });
    
    // 创建灯箱
    function createLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${src}" alt="${alt}">
                <span class="lightbox-close">&times;</span>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .lightbox.active {
                opacity: 1;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90vh;
            }
            
            .lightbox-content img {
                max-width: 100%;
                max-height: 90vh;
                object-fit: contain;
            }
            
            .lightbox-close {
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 3rem;
                cursor: pointer;
                transition: color 0.3s ease;
            }
            
            .lightbox-close:hover {
                color: #ccc;
            }
        `;
        
        if (!document.querySelector('style[data-lightbox]')) {
            style.setAttribute('data-lightbox', 'true');
            document.head.appendChild(style);
        }
        
        // 显示灯箱
        setTimeout(() => lightbox.classList.add('active'), 10);
        
        // 关闭功能
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.className === 'lightbox-close') {
                lightbox.classList.remove('active');
                setTimeout(() => lightbox.remove(), 300);
            }
        });
    }
    
    // 更新项目导航
    function updateProjectNavigation() {
        const prevButton = document.getElementById('prev-project');
        const nextButton = document.getElementById('next-project');
        
        if (currentProject.prevProject) {
            prevButton.href = `project-detail.html?id=${currentProject.prevProject}`;
            prevButton.style.visibility = 'visible';
        } else {
            prevButton.style.visibility = 'hidden';
        }
        
        if (currentProject.nextProject) {
            nextButton.href = `project-detail.html?id=${currentProject.nextProject}`;
            nextButton.style.visibility = 'visible';
        } else {
            nextButton.style.visibility = 'hidden';
        }
    }
    
    // 返回顶部按钮
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 图片加载动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transform = 'translateY(20px)';
                
                img.onload = function() {
                    img.style.transition = 'all 0.6s ease';
                    img.style.opacity = '1';
                    img.style.transform = 'translateY(0)';
                };
                
                imageObserver.unobserve(img);
            }
        });
    }, observerOptions);
    
    // 观察所有图片
    document.querySelectorAll('.gallery-item img').forEach(img => {
        imageObserver.observe(img);
    });
});