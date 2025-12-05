// 注册Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// 构建主要菜单栏
function buildPrimaryNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;

    const primaryLinks = [
        { href: '/index.html', icon: 'fas fa-home', label: '国内银行' },
        { href: '/global-banks.html', icon: 'fas fa-globe', label: '全球银行' },
        { href: '/swift-lookup.html', icon: 'fas fa-keyboard', label: 'SWIFT 查询' },
        { href: '/international-remittance.html', icon: 'fas fa-paper-plane', label: '国际汇款' },
        { href: '/global-payment-platforms.html', icon: 'fas fa-money-bill-wave', label: '全球支付' },
        { href: '/global-brokers.html', icon: 'fas fa-briefcase', label: '全球券商' },
        { href: '/global-insurance.html', icon: 'fas fa-shield-heart', label: '全球保险' },
        { href: '/credit-cards.html', icon: 'fas fa-credit-card', label: '信用卡' },
        { href: '/exchange-rates.html', icon: 'fas fa-exchange-alt', label: '实时汇率' }
    ];

    const utilityLinks = [
        { href: '/loan-interest-calculator.html', icon: 'fas fa-coins', label: '贷款利率' },
        { href: '/mortgage-60-year-calculator.html', icon: 'fas fa-house', label: '60年期房贷' },
        { href: '/credit-card-installment-calculator.html', icon: 'fas fa-calculator', label: '信用卡分期' },
        { href: '/credit-card-500k-installment.html', icon: 'fas fa-money-check-dollar', label: '50万分期' },
        { href: '/calculators.html', icon: 'fas fa-tools', label: '计算工具' },
        { href: '/math-calculator.html', icon: 'fas fa-square-root-variable', label: '多功能计算' },
        { href: '/compound-interest-calculator.html', icon: 'fas fa-chart-line', label: '复利计算' },
        { href: '/rmb-uppercase.html', icon: 'fas fa-yen-sign', label: '人民币大写' },
        { href: '/card-bin-lookup.html', icon: 'fas fa-magnifying-glass', label: 'BIN 查询' }
    ];

    const createLinkHTML = ({ href, icon, label }) => `
        <a href="${href}" class="nav-link">
            <i class="${icon}"></i>
            <span>${label}</span>
        </a>
    `;

    navMenu.innerHTML = `
        <div class="nav-brand" aria-label="主要菜单">
            <div class="brand-icon"><i class="fas fa-building-columns"></i></div>
            <div class="brand-text">
                <strong>主要菜单</strong>
                <small>银行与金融工具</small>
            </div>
        </div>
        <div class="nav-primary">${primaryLinks.map(createLinkHTML).join('')}</div>
        <div class="nav-more">
            <button class="more-toggle" type="button" aria-expanded="false">
                <i class="fas fa-ellipsis-h"></i>
                <span>更多工具</span>
            </button>
            <div class="more-panel">${utilityLinks.map(createLinkHTML).join('')}</div>
        </div>
    `;

    const currentPath = (window.location.pathname.split('/').filter(Boolean).pop() || 'index.html').toLowerCase();
    const allLinks = navMenu.querySelectorAll('a.nav-link');
    let hasActive = false;

    allLinks.forEach(link => {
        const hrefPath = link.getAttribute('href').split('/').filter(Boolean).pop()?.toLowerCase();
        if (hrefPath === currentPath) {
            link.classList.add('active');
            hasActive = true;
        }
    });

    if (!hasActive && allLinks.length) {
        allLinks[0].classList.add('active');
    }

    const moreToggle = navMenu.querySelector('.more-toggle');
    const morePanel = navMenu.querySelector('.more-panel');

    if (moreToggle && morePanel) {
        moreToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            const isOpen = morePanel.classList.toggle('open');
            moreToggle.setAttribute('aria-expanded', isOpen);
        });

        document.addEventListener('click', (event) => {
            if (!morePanel.classList.contains('open')) return;
            if (!morePanel.contains(event.target) && !moreToggle.contains(event.target)) {
                morePanel.classList.remove('open');
                moreToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 构建主要菜单栏
    buildPrimaryNavigation();

    // 初始化Favicon处理
    initializeFavicons();

    // 添加页面加载动画
    const bankCards = document.querySelectorAll('.bank-card');

    // 为每个银行卡片添加延迟动画
    bankCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // 添加滚动效果
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        
        if (scrolled > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.2)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.1)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // 添加银行卡片点击统计和错误处理
    const bankLinks = document.querySelectorAll('.bank-link');
    bankLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const bankName = this.closest('.bank-card').querySelector('.bank-name').textContent;
            const bankUrl = this.href;
            console.log(`用户点击了：${bankName}，链接：${bankUrl}`);
            
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // 添加链接验证和错误处理
            validateAndHandleLink(this, bankName, bankUrl);
        });
    });
    
    // 链接验证和错误处理函数
    function validateAndHandleLink(linkElement, bankName, url) {
        // 检查URL是否有效
        try {
            new URL(url);
        } catch (error) {
            console.error(`无效的URL: ${url}`);
            showErrorMessage(`链接无效，请稍后重试或联系客服。`);
            return;
        }
        
        // 添加加载状态
        const originalText = linkElement.innerHTML;
        linkElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 正在跳转...';
        linkElement.style.pointerEvents = 'none';
        
        // 设置超时处理
        const timeout = setTimeout(() => {
            linkElement.innerHTML = originalText;
            linkElement.style.pointerEvents = 'auto';
            showErrorMessage(`跳转超时，请检查网络连接或稍后重试。`);
        }, 10000);
        
        // 监听页面卸载事件来清除超时
        const handlePageUnload = () => {
            clearTimeout(timeout);
            window.removeEventListener('beforeunload', handlePageUnload);
        };
        window.addEventListener('beforeunload', handlePageUnload);
    }
    
    // 显示错误消息的函数
    function showErrorMessage(message) {
        // 创建错误提示元素
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            font-size: 14px;
            max-width: 300px;
            animation: slideInRight 0.3s ease;
        `;
        errorDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; cursor: pointer; font-size: 16px;">&times;</button>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
        
        // 自动移除错误消息
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 5000);
    }
    
    // 添加联系电话点击统计
    const contactPhones = document.querySelectorAll('.contact-phone');
    contactPhones.forEach(phone => {
        phone.addEventListener('click', function(e) {
            const bankName = this.closest('.bank-card').querySelector('.bank-name').textContent;
            const phoneNumber = this.textContent.trim();
            console.log(`用户点击了${bankName}的联系电话：${phoneNumber}`);
            
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // 添加点击反馈
            this.style.background = 'rgba(102, 126, 234, 0.3)';
            setTimeout(() => {
                this.style.background = '';
            }, 300);
        });
    });
    
    // 添加银行卡片悬浮效果
    bankCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // 添加平滑滚动效果
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // 添加搜索功能（如果需要）
    const searchBox = document.querySelector('.search-input');
    if (searchBox) {
        searchBox.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const cards = document.querySelectorAll('.bank-card');
            
            cards.forEach(card => {
                const bankName = card.querySelector('.bank-name').textContent.toLowerCase();
                const bankDescription = card.querySelector('.bank-description').textContent.toLowerCase();
                
                if (bankName.includes(searchTerm) || bankDescription.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    }
    
    // 添加回到顶部功能
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // 监听滚动事件显示/隐藏回到顶部按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // 回到顶部按钮点击事件
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 添加银行卡片加载动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 为每个银行卡片添加观察者
    bankCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // 添加页面性能优化
    const lazyLoadImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyLoadImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // 添加键盘导航支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // 添加触摸设备支持
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    // 页面加载完成提示
    console.log('银行卡推荐网站已加载完成！');
    console.log('包含银行数量:', bankCards.length);
});

// Favicon处理函数
function initializeFavicons() {
    const faviconImages = document.querySelectorAll('.favicon-img');
    
    faviconImages.forEach((img, index) => {
        // 添加加载状态
        img.classList.add('loading');
        
        // 延迟加载以避免同时请求过多
        setTimeout(() => {
            loadFaviconWithFallback(img);
        }, index * 100);
    });
}

function loadFaviconWithFallback(img) {
    const fallbackText = img.nextElementSibling;
    const originalSrc = img.src;
    const fallbackChar = img.dataset.fallback || img.alt.charAt(0);
    
    // 创建一个新的Image对象来测试加载
    const testImg = new Image();
    
    testImg.onload = function() {
        // 图片加载成功
        img.classList.remove('loading');
        img.classList.add('loaded');
        img.style.opacity = '1';
        if (fallbackText) {
            fallbackText.style.opacity = '0';
        }
        
        // 添加淡入动画
        img.style.animation = 'fadeInScale 0.5s ease forwards';
    };
    
    testImg.onerror = function() {
        // 图片加载失败，尝试备用URL
        const backupUrls = generateBackupUrls(originalSrc);
        tryBackupUrls(img, backupUrls, 0, fallbackChar);
    };
    
    // 设置超时处理
    setTimeout(() => {
        if (img.classList.contains('loading')) {
            testImg.onerror();
        }
    }, 5000);
    
    testImg.src = originalSrc;
}

function generateBackupUrls(originalUrl) {
    const domain = originalUrl.split('/')[2];
    return [
        `https://${domain}/favicon.png`,
        `https://${domain}/favicon.jpg`,
        `https://${domain}/apple-touch-icon.png`,
        `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
        `https://favicons.githubusercontent.com/${domain}`,
        `https://icon.horse/icon/${domain}`
    ];
}

function tryBackupUrls(img, urls, index, fallbackChar) {
    if (index >= urls.length) {
        // 所有备用URL都失败，显示降级文本
        showFallbackText(img, fallbackChar);
        return;
    }
    
    const testImg = new Image();
    
    testImg.onload = function() {
        // 备用图片加载成功
        img.src = urls[index];
        img.classList.remove('loading');
        img.classList.add('loaded');
        img.style.opacity = '1';
        const fallbackText = img.nextElementSibling;
        if (fallbackText) {
            fallbackText.style.opacity = '0';
        }
        img.style.animation = 'fadeInScale 0.5s ease forwards';
    };
    
    testImg.onerror = function() {
        // 当前备用URL失败，尝试下一个
        tryBackupUrls(img, urls, index + 1, fallbackChar);
    };
    
    testImg.src = urls[index];
}

function showFallbackText(img, fallbackChar) {
    img.classList.remove('loading');
    img.classList.add('error');
    img.style.opacity = '0';
    
    const fallbackText = img.nextElementSibling;
    if (fallbackText) {
        fallbackText.textContent = fallbackChar;
        fallbackText.style.opacity = '1';
        fallbackText.style.animation = 'fadeInScale 0.5s ease forwards';
    }
}

// 添加重试机制
function retryFailedFavicons() {
    const errorImages = document.querySelectorAll('.favicon-img.error');
    errorImages.forEach(img => {
        img.classList.remove('error');
        loadFaviconWithFallback(img);
    });
}

// 图片缓存管理
const imageCache = new Map();

function cacheImage(url, image) {
    if (!imageCache.has(url)) {
        imageCache.set(url, {
            image: image,
            timestamp: Date.now()
        });
    }
}

function getCachedImage(url) {
    const cached = imageCache.get(url);
    if (cached) {
        // 检查缓存是否过期（24小时）
        const isExpired = Date.now() - cached.timestamp > 24 * 60 * 60 * 1000;
        if (!isExpired) {
            return cached.image;
        } else {
            imageCache.delete(url);
        }
    }
    return null;
}

// 预加载关键图标
function preloadCriticalFavicons() {
    const criticalBanks = [
        'https://www.icbc.com.cn/favicon.ico',
        'https://www.abchina.com/favicon.ico',
        'https://www.ccb.com/favicon.ico',
        'https://www.boc.cn/favicon.ico',
        'https://www.cmbchina.com/favicon.ico'
    ];
    
    criticalBanks.forEach(url => {
        const img = new Image();
        img.onload = () => cacheImage(url, img);
        img.src = url;
    });
}

// 添加交叉观察器进行懒加载优化
function setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
        const faviconObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target.querySelector('.favicon-img');
                    if (img && img.classList.contains('loading')) {
                        loadFaviconWithFallback(img);
                        faviconObserver.unobserve(entry.target);
                    }
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        // 观察所有银行卡片
        document.querySelectorAll('.bank-card').forEach(card => {
            faviconObserver.observe(card);
        });
    }
}

// 在页面加载时预加载关键图标
document.addEventListener('DOMContentLoaded', function() {
    preloadCriticalFavicons();
    setupIntersectionObserver();
});

// 添加错误处理
window.addEventListener('error', function(e) {
    console.error('页面发生错误:', e.error);
});

// 添加页面卸载时的清理
window.addEventListener('beforeunload', function() {
    console.log('页面即将卸载');
}); 