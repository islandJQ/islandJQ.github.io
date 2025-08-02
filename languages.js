// 多语言支持
const translations = {
    'zh': {
        // 导航
        'nav.works': 'Works',
        'nav.academic': 'Publications',
        'nav.about': 'About',
        'nav.news': 'News',
        'nav.contact': 'Contact',
        'nav.lang': 'EN',
        
        // 主页
        'hero.title': 'Creative <span class="highlight">Design</span> Studio',
        'hero.subtitle': '平面设计 · 综合设计 · 视觉创意',
        'hero.description': '我们专注于简约现代的设计理念，为客户提供专业的视觉解决方案',
        'hero.viewWorks': '查看作品',
        'hero.learnMore': '了解更多',
        
        // 作品集
        'works.title': 'Works',
        'works.subtitle': '精选作品',
        'works.branding.title': '品牌视觉设计',
        'works.branding.subtitle': 'Brand Visual Design',
        'works.packaging.title': '包装设计',
        'works.packaging.subtitle': 'Packaging Design',
        'works.web.title': '网页设计',
        'works.web.subtitle': 'Web Design',
        'works.print.title': '印刷作品',
        'works.print.subtitle': 'Print Works',
        'works.digital.title': '数字设计',
        'works.digital.subtitle': 'Digital Design',
        'works.illustration.title': '插画设计',
        'works.illustration.subtitle': 'Illustration Design',
        'works.photography.title': '摄影',
        'works.photography.subtitle': 'Photography',
        
        // 工作室合照
        'studio.photo.title': 'islandJQ STUDIO Team',
        'studio.photo.caption': '创意设计工作室团队合影',
        
        // 关于我
        'me.title': 'About Me',
        'me.description1': '我是一名专注于简约现代设计的创意工作者，致力于为客户提供专业的视觉解决方案。',
        'me.description2': '擅长平面设计和综合设计，追求简洁而富有表现力的设计语言，让每一个作品都能传达出独特的视觉魅力。',
        'me.skills': '专业技能',
        'me.skills.design': '设计',
        'me.skills.tools': '工具',
        'me.skills.development': '开发',
        'me.experience': '工作经历',
        'me.experience.current.role': '创始人 & 创意总监',
        'me.experience.current.description': '创立个人设计工作室，专注于品牌设计、包装设计和数字设计领域。为各类客户提供从概念到实现的完整设计解决方案。',
        'me.experience.previous.role': '高级平面设计师',
        'me.experience.previous.company': '知名设计公司',
        'me.experience.previous.description': '在知名设计公司担任高级平面设计师，参与多个大型品牌项目的设计与执行，积累了丰富的商业设计经验。',
        'me.experience.early.role': '视觉设计师',
        'me.experience.early.company': '创意工作室',
        'me.experience.early.description': '专注于视觉设计和品牌形象的创建，为初创公司和中小企业提供专业的设计服务，建立了扎实的设计基础。',
        'me.philosophy.quote': '“简约不是减少，而是去除多余。<br>好的设计应该是不言而喻的。”',
        
        // 新闻
        'news.title': 'News',
        'news.subtitle': '最新动态与故事',
        'news.featured': '精选',
        'news.featured.title': '工作室全新视觉识别系统发布',
        'news.featured.content': '经过数月的精心设计和反复打磨，islandJQ STUDIO 全新的视觉识别系统正式发布。新的品牌形象更好地体现了我们简约现代的设计理念，以及对细节的极致追求。从标志设计到色彩系统，每一个细节都经过精心考量，旨在为客户提供更加专业和一致的品牌体验。',
        'news.readMore': '阅读更多',
        'news.item1.title': '新作品发布',
        'news.item1.content': '最新品牌设计项目正式发布，展现简约现代的设计理念。这个项目融合了传统文化元素与现代设计语言，为客户打造了独特而富有表现力的品牌形象。',
        'news.item2.title': '设计奖项获得',
        'news.item2.content': '包装设计作品荣获年度优秀设计奖，感谢评委会的认可。这个荣誉不仅是对我们设计实力的肯定，更是对我们坚持原创设计理念的最好回报。',
        'news.item3.title': '工作室更新',
        'news.item3.content': '工作室官网全新改版，提供更好的作品展示体验。新网站采用极简主义的设计风格，让访客能够更好地专注于我们的设计作品本身。',
        'news.item4.title': '设计展览参与',
        'news.item4.content': '受邀参加年度设计展览，展示最新的创意作品。在展览中，我们的作品获得了众多设计师和观众的好评，这也让我们更加坚定了追求设计excellence的决心。',
        'news.item5.title': '客户案例分享',
        'news.item5.content': '分享最新的客户合作案例，从概念到实现的完整设计过程。这个案例展现了我们如何通过深入了解客户需求，为其量身定制独特的设计解决方案。',
        
        // 联系
        'contact.title': 'Contact',
        'contact.description': '如果您对我们的设计服务感兴趣，欢迎联系我们进行合作洽谈。',
        'contact.getInTouch': '联系方式',
        'contact.sendMessage': '发送消息',
        'contact.form.name': '姓名',
        'contact.form.email': '邮箱',
        'contact.form.subject': '主题',
        'contact.form.message': '消息',
        'contact.form.send': '发送消息',
        'contact.studio.title': 'islandJQ STUDIO',
        'contact.studio.description': '专注简约现代设计的创意工作室',
        'contact.studio.location': '地址：中国苏州',
        
        // 学术发表
        'academic.title': '学术发表',
        'academic.subtitle': '设计理论研究 · 学术论文 · 期刊发表',
        'filter.all': '全部',
        'filter.journal': '期刊论文',
        'filter.conference': '会议论文',
        'filter.book': '专著',
        'filter.chapter': '章节',
        
        // Publications页面
        'publications.title': '学术发表',
        'publications.subtitle': '学术研究与设计发表',
        
        // 页脚
        'footer.copyright': '© 2024 islandJQ  DESIGN  STUDIO. All rights reserved.'
    },
    'en': {
        // 导航
        'nav.works': 'Works',
        'nav.academic': 'Publications',
        'nav.about': 'About',
        'nav.news': 'News',
        'nav.contact': 'Contact',
        'nav.lang': '中',
        
        // 主页
        'hero.title': 'Creative <span class="highlight">Design</span> Studio',
        'hero.subtitle': 'Graphic Design · Integrated Design · Visual Creativity',
        'hero.description': 'We focus on minimalist modern design concepts to provide professional visual solutions for clients',
        'hero.viewWorks': 'View Works',
        'hero.learnMore': 'Learn More',
        
        // 作品集
        'works.title': 'Works',
        'works.subtitle': 'Selected Projects',
        'works.branding.title': 'Brand Visual Design',
        'works.branding.subtitle': 'Brand Identity System',
        'works.packaging.title': 'Packaging Design',
        'works.packaging.subtitle': 'Product Package Design',
        'works.web.title': 'Web Design',
        'works.web.subtitle': 'Website Design & Development',
        'works.print.title': 'Print Works',
        'works.print.subtitle': 'Print Works',
        'works.digital.title': 'Digital Design',
        'works.digital.subtitle': 'Digital Design',
        'works.illustration.title': 'Illustration Design',
        'works.illustration.subtitle': 'Illustration Design',
        'works.photography.title': 'Photography',
        'works.photography.subtitle': 'Photography',
        
        // 工作室合照
        'studio.photo.title': 'islandJQ STUDIO Team',
        'studio.photo.caption': 'Creative Design Studio Team Photo',
        
        // 关于我
        'me.title': 'About Me',
        'me.description1': 'I am a creative professional focused on minimalist modern design, dedicated to providing professional visual solutions for clients.',
        'me.description2': 'Specializing in graphic design and integrated design, I pursue a simple yet expressive design language that allows each work to convey unique visual charm.',
        'me.skills': 'Professional Skills',
        'me.skills.design': 'Design',
        'me.skills.tools': 'Tools',
        'me.skills.development': 'Development',
        'me.experience': 'Experience',
        'me.experience.current.role': 'Founder & Creative Director',
        'me.experience.current.description': 'Founded personal design studio, focusing on brand design, packaging design, and digital design. Providing complete design solutions from concept to implementation for various clients.',
        'me.experience.previous.role': 'Senior Graphic Designer',
        'me.experience.previous.company': 'Leading Design Agency',
        'me.experience.previous.description': 'Served as senior graphic designer at a renowned design company, participating in the design and execution of multiple large brand projects, accumulating rich commercial design experience.',
        'me.experience.early.role': 'Visual Designer',
        'me.experience.early.company': 'Creative Studio',
        'me.experience.early.description': 'Focused on visual design and brand image creation, providing professional design services for startups and small businesses, establishing solid design foundation.',
        'me.philosophy.quote': '\"Simplicity is not about reduction, but about removing the unnecessary.<br>Good design should be self-evident.\"',
        
        // 新闻
        'news.title': 'News',
        'news.subtitle': 'Latest Updates & Stories',
        'news.featured': 'Featured',
        'news.featured.title': 'Studio New Visual Identity System Released',
        'news.featured.content': 'After months of careful design and refinement, islandJQ STUDIO\'s new visual identity system is officially released. The new brand image better reflects our minimalist modern design philosophy and pursuit of detail excellence. From logo design to color system, every detail has been carefully considered to provide clients with a more professional and consistent brand experience.',
        'news.readMore': 'Read More',
        'news.item1.title': 'New Work Released',
        'news.item1.content': 'Latest brand design project officially launched, showcasing minimalist modern design concepts. This project combines traditional cultural elements with modern design language, creating a unique and expressive brand image for the client.',
        'news.item2.title': 'Design Award Won',
        'news.item2.content': 'Packaging design work won the Annual Excellence Design Award, thanks to the jury for recognition. This honor is not only an affirmation of our design capabilities, but also the best reward for our commitment to original design concepts.',
        'news.item3.title': 'Studio Update',
        'news.item3.content': 'Studio website completely redesigned to provide better work display experience. The new website adopts a minimalist design style, allowing visitors to better focus on our design works themselves.',
        'news.item4.title': 'Design Exhibition Participation',
        'news.item4.content': 'Invited to participate in the annual design exhibition, showcasing our latest creative works. At the exhibition, our works received praise from many designers and audiences, which strengthened our determination to pursue design excellence.',
        'news.item5.title': 'Client Case Study',
        'news.item5.content': 'Sharing the latest client collaboration case study, from concept to implementation complete design process. This case demonstrates how we create unique design solutions tailored to clients through deep understanding of their needs.',
        
        // 联系
        'contact.title': 'Contact',
        'contact.description': 'If you are interested in our design services, please feel free to contact us for cooperation.',
        'contact.getInTouch': 'Get in Touch',
        'contact.sendMessage': 'Send a Message',
        'contact.form.name': 'Name',
        'contact.form.email': 'Email',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Message',
        'contact.form.send': 'Send Message',
        'contact.studio.title': 'islandJQ STUDIO',
        'contact.studio.description': 'Creative studio focused on minimalist modern design',
        'contact.studio.location': 'Based in China, Suzhou',
        
        // 学术发表
        'academic.title': 'Publications',
        'academic.subtitle': 'Design Theory Research · Academic Papers · Journal Publications',
        'filter.all': 'All',
        'filter.journal': 'Journal Papers',
        'filter.conference': 'Conference Papers',
        'filter.book': 'Books',
        'filter.chapter': 'Chapters',
        
        // Publications页面
        'publications.title': 'Publications',
        'publications.subtitle': 'Academic Research & Design Publications',
        
        // 页脚
        'footer.copyright': '© 2024 islandJQ  DESIGN  STUDIO. All rights reserved.'
    }
};

// 语言管理器
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'zh';
        this.translations = translations;
        this.initialized = false;
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
        
        // 标记为已初始化
        this.initialized = true;
    }
}

// 创建全局语言管理器实例
window.languageManager = new LanguageManager();