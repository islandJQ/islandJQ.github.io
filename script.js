// 导航栏响应式菜单
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 切换移动端菜单
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // 点击导航链接时关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // 平滑滚动到目标部分
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // 减去导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 滚动时高亮当前导航项
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 技能标签动画
    const skillTags = document.querySelectorAll('.skill-tag');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    skillTags.forEach(tag => {
        skillObserver.observe(tag);
    });

    // 项目卡片动画
    const projectCards = document.querySelectorAll('.project-card');
    
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 200);
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        cardObserver.observe(card);
    });

    // 添加打字机效果到英雄标题
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // 页面加载时的动画
    function initAnimations() {
        // 英雄区域淡入效果
        const heroContent = document.querySelector('.hero-content');
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);

        // 导航栏淡入效果
        const navbar = document.querySelector('.navbar');
        navbar.style.transform = 'translateY(-100%)';
        
        setTimeout(() => {
            navbar.style.transition = 'transform 0.5s ease';
            navbar.style.transform = 'translateY(0)';
        }, 500);
    }

    // 滚动时的视差效果
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // 初始化动画
    initAnimations();

    // 添加鼠标跟随效果（可选）
    document.addEventListener('mousemove', function(e) {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });

    // 表单验证（如果有联系表单的话）
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // 这里可以添加表单提交逻辑
            alert('感谢您的留言！我会尽快回复您。');
        });
    }

    // 添加 GitHub API 集成（获取真实项目数据）
    async function fetchGitHubProjects() {
        try {
            const response = await fetch('https://api.github.com/users/islandJQ/repos');
            const repos = await response.json();
            
            if (Array.isArray(repos) && repos.length > 0) {
                updateProjectsSection(repos.slice(0, 6)); // 显示前6个项目
            }
        } catch (error) {
            console.log('无法获取 GitHub 项目数据:', error);
        }
    }

    function updateProjectsSection(repos) {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;

        // 清空现有项目卡片
        projectsGrid.innerHTML = '';

        repos.forEach(repo => {
            const projectCard = createProjectCard(repo);
            projectsGrid.appendChild(projectCard);
        });
    }

    function createProjectCard(repo) {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        // 根据项目语言选择图标
        const languageIcons = {
            'JavaScript': 'fab fa-js-square',
            'TypeScript': 'fab fa-js-square',
            'Python': 'fab fa-python',
            'Java': 'fab fa-java',
            'HTML': 'fab fa-html5',
            'CSS': 'fab fa-css3-alt',
            'Vue': 'fab fa-vuejs',
            'React': 'fab fa-react',
            'default': 'fas fa-code'
        };

        const icon = languageIcons[repo.language] || languageIcons.default;
        
        card.innerHTML = `
            <div class="project-image">
                <i class="${icon}"></i>
            </div>
            <div class="project-content">
                <h3>${repo.name}</h3>
                <p>${repo.description || '暂无描述'}</p>
                <div class="project-tech">
                    ${repo.language ? `<span class="tech-tag">${repo.language}</span>` : ''}
                    ${repo.topics ? repo.topics.slice(0, 3).map(topic => 
                        `<span class="tech-tag">${topic}</span>`
                    ).join('') : ''}
                </div>
                <div class="project-links">
                    ${repo.homepage ? `<a href="${repo.homepage}" class="project-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> 预览
                    </a>` : ''}
                    <a href="${repo.html_url}" class="project-link" target="_blank">
                        <i class="fab fa-github"></i> 代码
                    </a>
                </div>
            </div>
        `;
        
        return card;
    }

    // 获取 GitHub 项目数据
    fetchGitHubProjects();
});

// CSS 动画类
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .nav-link.active {
        color: var(--primary-color);
    }

    .nav-link.active::after {
        width: 100%;
    }

    .cursor {
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
    }
`;

document.head.appendChild(style);