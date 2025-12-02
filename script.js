// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Theme toggle functionality
const themeBtn = document.querySelector('.theme-btn');
let isDarkMode = true;

themeBtn.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        themeBtn.textContent = '☀️';
        document.documentElement.style.setProperty('--bg-primary', '#000000');
        document.documentElement.style.setProperty('--bg-secondary', '#0a0a0a');
        document.documentElement.style.setProperty('--bg-card', '#1a1a1a');
        document.documentElement.style.setProperty('--text-primary', '#ffffff');
        document.documentElement.style.setProperty('--text-secondary', '#a0a0a0');
    } else {
        themeBtn.textContent = '🌙';
        document.documentElement.style.setProperty('--bg-primary', '#ffffff');
        document.documentElement.style.setProperty('--bg-secondary', '#f5f5f5');
        document.documentElement.style.setProperty('--bg-card', '#e5e5e5');
        document.documentElement.style.setProperty('--text-primary', '#000000');
        document.documentElement.style.setProperty('--text-secondary', '#666666');
    }
});

// Tab switching functionality for asset table
const tabBtns = document.querySelectorAll('.tab-btn');
const tableBody = document.getElementById('tableBody');

const assetData = {
    crypto: [
        { code: 'BTC', price: '$67,234', change: '+2.45%', class: 'positive', volume: '$2.4B', avg: '67.2K' },
        { code: 'ETH', price: '$3,567', change: '+3.12%', class: 'positive', volume: '$1.8B', avg: '3.5K' },
        { code: 'BNB', price: '$421', change: '+1.89%', class: 'positive', volume: '$890M', avg: '418' }
    ],
    forex: [
        { code: 'EUR/USD', price: '1.0892', change: '+0.15%', class: 'positive', volume: '$125B', avg: '1.0885' },
        { code: 'GBP/USD', price: '1.2743', change: '-0.23%', class: 'negative', volume: '$98B', avg: '1.2765' },
        { code: 'USD/JPY', price: '149.85', change: '+0.08%', class: 'positive', volume: '$87B', avg: '149.73' }
    ],
    commodities: [
        { code: 'GOLD', price: '$2,045', change: '+0.65%', class: 'positive', volume: '$45B', avg: '2,032' },
        { code: 'OIL', price: '$78.32', change: '-1.12%', class: 'negative', volume: '$32B', avg: '79.21' },
        { code: 'SILVER', price: '$24.15', change: '+0.34%', class: 'positive', volume: '$12B', avg: '24.07' }
    ],
    indices: [
        { code: 'S&P 500', price: '4,783', change: '+0.89%', class: 'positive', volume: '$156B', avg: '4,741' },
        { code: 'NASDAQ', price: '15,123', change: '+1.24%', class: 'positive', volume: '$134B', avg: '14,938' },
        { code: 'DOW JONES', price: '37,892', change: '+0.45%', class: 'positive', volume: '$98B', avg: '37,723' }
    ],
    stocks: [
        { code: 'AAPL', price: '$195.89', change: '+2.15%', class: 'positive', volume: '$28B', avg: '191.78' },
        { code: 'TSLA', price: '$242.84', change: '-1.87%', class: 'negative', volume: '$45B', avg: '247.45' },
        { code: 'GOOGL', price: '$151.32', change: '+0.92%', class: 'positive', volume: '$22B', avg: '149.94' }
    ]
};

function updateTable(assetType) {
    const data = assetData[assetType];
    tableBody.innerHTML = data.map(item => `
        <tr data-asset="${assetType}">
            <td>${item.code}</td>
            <td>${item.price}</td>
            <td class="${item.class}">${item.change}</td>
            <td>${item.volume}</td>
            <td>${item.avg}</td>
        </tr>
    `).join('');
}

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const assetType = btn.getAttribute('data-asset');
        updateTable(assetType);
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all feature items and testimonial cards
document.querySelectorAll('.feature-item, .testimonial-card, .partner-logo').forEach(el => {
    observer.observe(el);
});

// Add stagger animation to partner logos
const partnerLogos = document.querySelectorAll('.partner-logo');
partnerLogos.forEach((logo, index) => {
    logo.style.animationDelay = `${index * 0.1}s`;
});

// Crypto price update simulation (for demo purposes)
function updateCryptoPrices() {
    const prices = document.querySelectorAll('.coin-price');
    prices.forEach(price => {
        const currentPrice = parseFloat(price.textContent.replace('$', '').replace(',', ''));
        const change = (Math.random() - 0.5) * 100;
        const newPrice = currentPrice + change;
        price.textContent = '$' + newPrice.toFixed(0).toLocaleString();
    });
}

// Update prices every 5 seconds
setInterval(updateCryptoPrices, 5000);

// Hotkey functionality for crypto navigation
let currentCryptoIndex = 0;
const cryptos = ['BTC', 'ETH', 'BNB', 'SOL', 'ADA', 'DOT'];

document.addEventListener('keydown', (e) => {
    // Ctrl + Arrow Right or Meta + Arrow Right
    if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowRight') {
        e.preventDefault();
        currentCryptoIndex = (currentCryptoIndex + 1) % cryptos.length;
        showNotification(`Switched to ${cryptos[currentCryptoIndex]}`);
    }
    
    // Ctrl + Arrow Left or Meta + Arrow Left
    if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowLeft') {
        e.preventDefault();
        currentCryptoIndex = (currentCryptoIndex - 1 + cryptos.length) % cryptos.length;
        showNotification(`Switched to ${cryptos[currentCryptoIndex]}`);
    }
});

// Show notification function
function showNotification(message) {
    // Remove existing notification if any
    const existingNotif = document.querySelector('.notification-toast');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: rgba(59, 130, 246, 0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add keyframes for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Coin item click handler
document.querySelectorAll('.coin-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.coin-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        const coinName = this.textContent.split(' ')[0];
        showNotification(`Viewing ${coinName} chart`);
    });
});

// GPT item click handler
document.querySelectorAll('.gpt-item').forEach(item => {
    item.addEventListener('click', function() {
        const gptName = this.querySelector('.gpt-name').textContent;
        showNotification(`Opening ${gptName}...`);
    });
});

// Button click handlers with notifications
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.textContent.trim() === 'Sign Up') {
            showNotification('Opening sign up form...');
        } else if (this.textContent.trim() === 'Get Started') {
            showNotification('Welcome to INVESTHINK! 🚀');
        } else if (this.textContent.trim() === 'Try Now') {
            showNotification('Feature coming soon! Stay tuned 🎯');
        }
    });
});

// Mobile menu functionality
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu a');

// Debug: Check if elements exist
console.log('Mobile menu elements:', {
    toggle: mobileMenuToggle,
    menu: mobileMenu,
    overlay: mobileMenuOverlay,
    close: mobileMenuClose,
    links: mobileNavLinks.length
});

function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Mobile menu toggle clicked');
        openMobileMenu();
    });
} else {
    console.error('Mobile menu toggle not found!');
}

if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Mobile menu close clicked');
        closeMobileMenu();
    });
} else {
    console.error('Mobile menu close not found!');
}

if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', (e) => {
        console.log('Mobile menu overlay clicked');
        closeMobileMenu();
    });
} else {
    console.error('Mobile menu overlay not found!');
}

// Close mobile menu when clicking on a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }, 250);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// Touch gesture support for crypto navigation (swipe)
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

function handleGesture() {
    const swipeThreshold = 50;
    const verticalThreshold = 30;
    
    // Calculate swipe distance
    const horizontalDistance = touchEndX - touchStartX;
    const verticalDistance = Math.abs(touchEndY - touchStartY);
    
    // Only trigger if horizontal swipe is longer than vertical (avoid conflict with scroll)
    if (Math.abs(horizontalDistance) > swipeThreshold && verticalDistance < verticalThreshold) {
        if (horizontalDistance > 0) {
            // Swipe right - previous crypto
            currentCryptoIndex = (currentCryptoIndex - 1 + cryptos.length) % cryptos.length;
            showNotification(`◀ ${cryptos[currentCryptoIndex]}`);
        } else {
            // Swipe left - next crypto
            currentCryptoIndex = (currentCryptoIndex + 1) % cryptos.length;
            showNotification(`${cryptos[currentCryptoIndex]} ▶`);
        }
    }
}

// Add touch event listeners to feature images
document.querySelectorAll('.feature-image').forEach(element => {
    element.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    element.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleGesture();
    }, { passive: true });
});

// Lazy loading for images and animations
const observerOptionsLazy = {
    root: null,
    rootMargin: '50px',
    threshold: 0.01
};

const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('lazy-loaded');
            // Trigger animation
            if (entry.target.classList.contains('feature-image')) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
            lazyObserver.unobserve(entry.target);
        }
    });
}, observerOptionsLazy);

// Observe feature images for lazy loading
document.querySelectorAll('.feature-image, .testimonial-card').forEach(el => {
    lazyObserver.observe(el);
});

// Performance optimization - reduce animations on low-end devices
const isLowEndDevice = () => {
    return navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
};

if (isLowEndDevice()) {
    document.body.classList.add('reduce-motion');
    // Add CSS to reduce animations
    const reduceMotionStyle = document.createElement('style');
    reduceMotionStyle.textContent = `
        .reduce-motion * {
            animation-duration: 0.01s !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01s !important;
        }
    `;
    document.head.appendChild(reduceMotionStyle);
}

// Smooth scroll behavior with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Optimize scroll performance with throttle
let ticking = false;
let lastScrollY = window.pageYOffset;

function updateNavbarOnScroll() {
    lastScrollY = window.pageYOffset;
    
    if (lastScrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    ticking = false;
}

// Replace the existing scroll listener with optimized version
window.removeEventListener('scroll', () => {}); // Remove old listener
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbarOnScroll);
        ticking = true;
    }
}, { passive: true });

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
    
    // Preload critical assets
    const preloadImages = document.querySelectorAll('img[data-preload]');
    preloadImages.forEach(img => {
        const source = img.getAttribute('data-preload');
        img.src = source;
    });
});

// Add viewport height fix for mobile browsers
const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

setVH();
window.addEventListener('resize', setVH);

// Better mobile menu handling with body scroll lock
function lockBodyScroll() {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
}

function unlockBodyScroll() {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
}

// Update mobile menu functions
function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    lockBodyScroll();
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    unlockBodyScroll();
}

// Add swipe gesture for mobile menu
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    // Swipe right to open menu (from left edge)
    if (touchStartX < 50 && diff < -swipeThreshold) {
        if (!mobileMenu.classList.contains('active')) {
            openMobileMenu();
        }
    }
    
    // Swipe left to close menu
    if (diff > swipeThreshold && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
}

// Better responsive image handling
function handleResponsiveImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        if (img.getBoundingClientRect().top < window.innerHeight + 200) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
    });
}

// Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        handleResponsiveImages();
        setVH();
        
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }, 250);
});

// Add orientation change handler
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        setVH();
        handleResponsiveImages();
    }, 100);
});

// Better performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'measure') {
            console.log(`${entry.name}: ${entry.duration}ms`);
        }
    }
});

if ('PerformanceObserver' in window) {
    performanceObserver.observe({ entryTypes: ['measure'] });
}

// Add responsive navigation improvements
function handleResponsiveNav() {
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');
    
    if (window.innerWidth <= 820) {
        if (navMenu && !navMenu.classList.contains('mobile-hidden')) {
            navMenu.style.display = 'none';
            navMenu.classList.add('mobile-hidden');
        }
    } else {
        if (navMenu && navMenu.classList.contains('mobile-hidden')) {
            navMenu.style.display = 'flex';
            navMenu.classList.remove('mobile-hidden');
        }
    }
}

// Initialize responsive handlers
handleResponsiveNav();
window.addEventListener('resize', handleResponsiveNav);

// Add smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    import('https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js')
        .then(() => {
            window.__forceSmoothScrollPolyfill__ = true;
        });
}

// Detect if user prefers reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduce-motion');
}

console.log('🚀 INVESTHINK - Platform Trading Kripto dengan AI');
console.log('Website loaded successfully!');
console.log('📱 Responsive mode: Active');
console.log('👆 Touch gestures: Enabled');
