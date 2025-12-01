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

// Tab switching functionality for crypto table
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
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

// Mobile menu toggle (for future implementation)
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.innerHTML = '☰';
mobileMenuBtn.style.cssText = `
    display: none;
    background: transparent;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    padding: 8px;
`;

// Add to navbar on mobile
if (window.innerWidth <= 768) {
    document.querySelector('.nav-actions').prepend(mobileMenuBtn);
    mobileMenuBtn.style.display = 'block';
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('🚀 INVESTHINK - Platform Trading Kripto dengan AI');
console.log('Website loaded successfully!');
