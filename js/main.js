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
});