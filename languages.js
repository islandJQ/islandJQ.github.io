// 多语言支持
const translations = {
    'zh': {
        // 导航
        'nav.works': 'Works',
        'nav.me': 'Me',
        'nav.news': 'News',
        'nav.lang': 'EN',
        
        // 主页
        'hero.title': 'Creative <span class="highlight">Design</span> Studio',
        'hero.subtitle': '平面设计 · 综合设计 · 视觉创意',
        'hero.description': '我们专注于简约现代的设计理念，为客户提供专业的视觉解决方案',
        'hero.viewWorks': '查看作品',
        'hero.learnMore': '了解更多',
        
        // 作品集
        'works.title': 'Works',
        'works.branding.title': '创新科技品牌视觉识别系统',
        'works.branding.subtitle': 'Tech Brand Identity System',
        'works.packaging.title': '有机茶品包装设计系列',
        'works.packaging.subtitle': 'Organic Tea Packaging Design',
        'works.web.title': '创意工作室响应式网站设计',
        'works.web.subtitle': 'Creative Studio Website Design',
        'works.print.title': '印刷设计作品',
        'works.print.subtitle': 'Print Design Collection',
        'works.digital.title': '数字设计项目',
        'works.digital.subtitle': 'Digital Design Project',
        'works.illustration.title': '插画设计',
        'works.illustration.subtitle': 'Illustration Works',
        'works.photography.title': '摄影作品',
        'works.photography.subtitle': 'Photography Works',
        
        // 关于我
        'me.title': 'Me',
        'me.description1': '我是一名专注于简约现代设计的创意工作者，致力于为客户提供专业的视觉解决方案。',
        'me.description2': '擅长平面设计和综合设计，追求简洁而富有表现力的设计语言，让每一个作品都能传达出独特的视觉魅力。',
        'me.skills': '专业技能',
        
        // 新闻
        'news.title': 'News',
        'news.item1.title': '新作品发布',
        'news.item1.content': '最新品牌设计项目正式发布，展现简约现代的设计理念。',
        'news.item2.title': '设计奖项获得',
        'news.item2.content': '包装设计作品荣获年度优秀设计奖，感谢评委会的认可。',
        'news.item3.title': '工作室更新',
        'news.item3.content': '工作室官网全新改版，提供更好的作品展示体验。',
        
        // 联系
        'contact.title': 'Contact',
        'contact.description': '如果您对我们的设计服务感兴趣，欢迎联系我们进行合作洽谈。',
        
        // 页脚
        'footer.copyright': '© 2024 islandJQ  DESIGN  STUDIO. All rights reserved.'
    },
    'en': {
        // 导航
        'nav.works': 'Works',
        'nav.me': 'Me',
        'nav.news': 'News',
        'nav.lang': '中',
        
        // 主页
        'hero.title': 'Creative <span class="highlight">Design</span> Studio',
        'hero.subtitle': 'Graphic Design · Integrated Design · Visual Creativity',
        'hero.description': 'We focus on minimalist modern design concepts to provide professional visual solutions for clients',
        'hero.viewWorks': 'View Works',
        'hero.learnMore': 'Learn More',
        
        // 作品集
        'works.title': 'Works',
        'works.branding.title': 'Tech Brand Identity System',
        'works.branding.subtitle': 'Visual Identity Design',
        'works.packaging.title': 'Organic Tea Packaging Series',
        'works.packaging.subtitle': 'Package Design',
        'works.web.title': 'Creative Studio Website',
        'works.web.subtitle': 'Responsive Web Design',
        'works.print.title': 'Print Design Works',
        'works.print.subtitle': 'Print Design Collection',
        'works.digital.title': 'Digital Design Project',
        'works.digital.subtitle': 'Digital Design',
        'works.illustration.title': 'Illustration Works',
        'works.illustration.subtitle': 'Illustration Design',
        'works.photography.title': 'Photography Works',
        'works.photography.subtitle': 'Photography',
        
        // 关于我
        'me.title': 'About Me',
        'me.description1': 'I am a creative professional focused on minimalist modern design, dedicated to providing professional visual solutions for clients.',
        'me.description2': 'Specializing in graphic design and integrated design, I pursue a simple yet expressive design language that allows each work to convey unique visual charm.',
        'me.skills': 'Professional Skills',
        
        // 新闻
        'news.title': 'News',
        'news.item1.title': 'New Work Released',
        'news.item1.content': 'Latest brand design project officially launched, showcasing minimalist modern design concepts.',
        'news.item2.title': 'Design Award Won',
        'news.item2.content': 'Packaging design work won the Annual Excellence Design Award, thanks to the jury for recognition.',
        'news.item3.title': 'Studio Update',
        'news.item3.content': 'Studio website completely redesigned to provide better work display experience.',
        
        // 联系
        'contact.title': 'Contact',
        'contact.description': 'If you are interested in our design services, please feel free to contact us for cooperation.',
        
        // 页脚
        'footer.copyright': '© 2024 islandJQ  DESIGN  STUDIO. All rights reserved.'
    }
};

// 语言管理器
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'zh';
        this.translations = translations;
    }
    
    // 获取当前语言
    getCurrentLang() {
        return this.currentLang;
    }
    
    // 切换语言
    toggleLanguage() {
        this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh';
        localStorage.setItem('language', this.currentLang);
        this.updatePageContent();
    }
    
    // 获取翻译文本
    translate(key) {
        return this.translations[this.currentLang][key] || key;
    }
    
    // 更新页面内容
    updatePageContent() {
        // 更新所有带有 data-translate 属性的元素
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.translate(key);
            
            // 如果包含HTML标签，使用innerHTML
            if (translation.includes('<')) {
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        // 更新语言切换按钮
        const langSwitch = document.getElementById('lang-switch');
        if (langSwitch) {
            langSwitch.textContent = this.translate('nav.lang');
        }
        
        // 更新页面方向（如果需要支持RTL语言）
        document.documentElement.lang = this.currentLang;
        
        // 触发语言改变事件
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: this.currentLang } 
        }));
    }
    
    // 初始化
    init() {
        // 页面加载时应用当前语言
        this.updatePageContent();
        
        // 绑定语言切换按钮
        const langSwitch = document.getElementById('lang-switch');
        if (langSwitch) {
            langSwitch.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleLanguage();
            });
        }
    }
}

// 创建全局语言管理器实例
window.languageManager = new LanguageManager();