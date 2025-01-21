document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滑动效果
    const navbar = document.querySelector('.navbar');
    
    // 页面加载时立即显示导航栏
    navbar.style.top = '0';

    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (navbar) {
            // 保持导航栏始终可见
            navbar.style.top = '0';
            
            // 滚动时的模糊效果
            if (scrollTop > 50) {
                navbar.style.backdropFilter = 'blur(12px)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.backdropFilter = 'blur(8px)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
            }
        }
    });

    // 平滑滚动到锚点时也使用相同的动画效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                // 保持导航栏可见
                navbar.style.top = '0';
                
                // 滚动到目标位置
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            
            // 更新活动链接
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // 滚动监听，更新导航栏活动状态
    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // 技能条动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target.querySelector('.skill-bar');
                if (skillBar) {
                    const width = skillBar.style.width;
                    skillBar.style.width = '0';
                    setTimeout(() => {
                        skillBar.style.width = width;
                    }, 100);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-card').forEach(card => {
        observer.observe(card);
    });

    // 添加鼠标悬停效果
    document.querySelectorAll('.interest-item, .skill-card, .contact-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 联系方式点击复制功能
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('p').textContent;
            navigator.clipboard.writeText(text).then(() => {
                // 创建提示元素
                const tooltip = document.createElement('div');
                tooltip.textContent = '已复制!';
                tooltip.style.cssText = `
                    position: fixed;
                    background: rgba(74, 144, 226, 0.9);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 4px;
                    font-size: 14px;
                    pointer-events: none;
                    z-index: 1000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                
                // 计算位置
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width - tooltip.offsetWidth) / 2 + 'px';
                tooltip.style.top = rect.top - 40 + 'px';
                
                // 添加到页面
                document.body.appendChild(tooltip);
                
                // 显示动画
                requestAnimationFrame(() => {
                    tooltip.style.opacity = '1';
                });
                
                // 3秒后移除
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                    setTimeout(() => tooltip.remove(), 300);
                }, 2000);
            });
        });
    });

    // 项目卡片悬停效果
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.project-overlay');
            overlay.style.opacity = '1';
        });

        card.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.project-overlay');
            overlay.style.opacity = '0';
        });

        // 链接点击效果
        card.querySelectorAll('.project-overlay a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });
    });

    // 添加项目卡片到观察者
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
});