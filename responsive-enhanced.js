/**
 * ========================================
 * ENHANCED RESPONSIVE JAVASCRIPT
 * INVESTHINK Platform
 * ========================================
 */

class ResponsiveManager {
    constructor() {
        this.currentBreakpoint = this.getBreakpoint();
        this.orientation = this.getOrientation();
        this.isTouch = this.isTouchDevice();
        this.isMobile = this.isMobileDevice();
        this.viewport = this.getViewport();
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupViewportUnits();
        this.setupTouchOptimizations();
        this.setupPerformanceOptimizations();
        this.updateBodyClasses();
        
        console.log('📱 Responsive Manager Initialized');
        console.log(`📐 Breakpoint: ${this.currentBreakpoint}`);
        console.log(`📱 Device: ${this.isMobile ? 'Mobile' : 'Desktop'}`);
        console.log(`👆 Touch: ${this.isTouch ? 'Yes' : 'No'}`);
        console.log(`🔄 Orientation: ${this.orientation}`);
    }
    
    getBreakpoint() {
        const width = window.innerWidth;
        if (width < 480) return 'xs';
        if (width < 768) return 'sm';
        if (width < 1024) return 'md';
        if (width < 1200) return 'lg';
        return 'xl';
    }
    
    getOrientation() {
        return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    }
    
    isTouchDevice() {
        return 'ontouchstart' in window || 
               navigator.maxTouchPoints > 0 || 
               navigator.msMaxTouchPoints > 0;
    }
    
    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               this.isTouch && window.innerWidth < 1024;
    }
    
    getViewport() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            scrollX: window.scrollX,
            scrollY: window.scrollY
        };
    }
    
    setupEventListeners() {
        // Debounced resize handler
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Orientation change handler
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleOrientationChange();
            }, 100);
        });
        
        // Scroll handler with throttling
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
        
        // Visibility change handler
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
    }
    
    setupViewportUnits() {
        // Fix for mobile viewport height issues
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            
            const vw = window.innerWidth * 0.01;
            document.documentElement.style.setProperty('--vw', `${vw}px`);
        };
        
        setVH();
        window.addEventListener('resize', setVH);
        
        // Handle address bar show/hide on mobile
        if (this.isMobile) {
            window.addEventListener('scroll', () => {
                setTimeout(setVH, 100);
            });
        }
    }
    
    setupTouchOptimizations() {
        if (!this.isTouch) return;
        
        // Add touch classes
        document.body.classList.add('touch-device');
        
        // Disable hover effects on touch devices
        const style = document.createElement('style');
        style.textContent = `
            .touch-device *:hover {
                transform: none !important;
                box-shadow: none !important;
            }
        `;
        document.head.appendChild(style);
        
        // Setup touch gestures
        this.setupTouchGestures();
        
        // Improve tap targets
        this.improveTapTargets();
    }
    
    setupTouchGestures() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            this.handleGesture(touchStartX, touchStartY, touchEndX, touchEndY);
        }, { passive: true });
    }
    
    handleGesture(startX, startY, endX, endY) {
        const swipeThreshold = 50;
        const verticalThreshold = 30;
        
        const horizontalDistance = endX - startX;
        const verticalDistance = Math.abs(endY - startY);
        
        if (Math.abs(horizontalDistance) > swipeThreshold && verticalDistance < verticalThreshold) {
            const swipeEvent = new CustomEvent('swipe', {
                detail: {
                    direction: horizontalDistance > 0 ? 'right' : 'left',
                    distance: Math.abs(horizontalDistance)
                }
            });
            document.dispatchEvent(swipeEvent);
        }
    }
    
    improveTapTargets() {
        // Find small interactive elements and make them bigger
        const smallElements = document.querySelectorAll('a, button, input, select, textarea');
        smallElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.width < 44 || rect.height < 44) {
                element.style.minWidth = '44px';
                element.style.minHeight = '44px';
                element.style.display = 'inline-flex';
                element.style.alignItems = 'center';
                element.style.justifyContent = 'center';
            }
        });
    }
    
    setupPerformanceOptimizations() {
        // Reduce animations on low-end devices
        if (this.isLowEndDevice()) {
            document.body.classList.add('reduce-motion');
            this.reduceAnimations();
        }
        
        // Setup lazy loading
        this.setupLazyLoading();
        
        // Optimize images
        this.optimizeImages();
    }
    
    isLowEndDevice() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const hardwareConcurrency = navigator.hardwareConcurrency || 4;
        
        return (
            hardwareConcurrency < 4 ||
            (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) ||
            navigator.deviceMemory < 4
        );
    }
    
    reduceAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            .reduce-motion * {
                animation-duration: 0.01s !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01s !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading="lazy" for modern browsers
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add error handling
            img.addEventListener('error', () => {
                img.style.display = 'none';
            });
        });
    }
    
    handleResize() {
        const oldBreakpoint = this.currentBreakpoint;
        const oldOrientation = this.orientation;
        
        this.currentBreakpoint = this.getBreakpoint();
        this.orientation = this.getOrientation();
        this.viewport = this.getViewport();
        
        // Update body classes
        this.updateBodyClasses();
        
        // Dispatch events
        if (oldBreakpoint !== this.currentBreakpoint) {
            this.dispatchBreakpointChange(oldBreakpoint, this.currentBreakpoint);
        }
        
        if (oldOrientation !== this.orientation) {
            this.dispatchOrientationChange(oldOrientation, this.orientation);
        }
        
        // Update viewport units
        this.setupViewportUnits();
    }
    
    handleOrientationChange() {
        this.orientation = this.getOrientation();
        this.updateBodyClasses();
        this.dispatchOrientationChange(this.orientation, this.getOrientation());
        
        // Small delay for browser to adjust
        setTimeout(() => {
            this.setupViewportUnits();
        }, 100);
    }
    
    handleScroll() {
        this.viewport.scrollX = window.scrollX;
        this.viewport.scrollY = window.scrollY;
        
        // Dispatch scroll event with position
        const scrollEvent = new CustomEvent('optimizedScroll', {
            detail: {
                x: this.viewport.scrollX,
                y: this.viewport.scrollY,
                direction: this.getScrollDirection()
            }
        });
        document.dispatchEvent(scrollEvent);
    }
    
    handleVisibilityChange() {
        if (document.hidden) {
            document.body.classList.add('page-hidden');
        } else {
            document.body.classList.remove('page-hidden');
        }
    }
    
    getScrollDirection() {
        const currentScroll = window.scrollY;
        const direction = currentScroll > this.lastScroll ? 'down' : 'up';
        this.lastScroll = currentScroll;
        return direction;
    }
    
    updateBodyClasses() {
        // Remove old classes
        document.body.classList.remove(
            'breakpoint-xs', 'breakpoint-sm', 'breakpoint-md', 
            'breakpoint-lg', 'breakpoint-xl',
            'orientation-landscape', 'orientation-portrait',
            'device-mobile', 'device-desktop'
        );
        
        // Add current classes
        document.body.classList.add(`breakpoint-${this.currentBreakpoint}`);
        document.body.classList.add(`orientation-${this.orientation}`);
        document.body.classList.add(this.isMobile ? 'device-mobile' : 'device-desktop');
        
        if (this.isTouch) {
            document.body.classList.add('touch-device');
        }
    }
    
    dispatchBreakpointChange(oldBreakpoint, newBreakpoint) {
        const event = new CustomEvent('breakpointChange', {
            detail: { oldBreakpoint, newBreakpoint }
        });
        document.dispatchEvent(event);
        
        console.log(`📐 Breakpoint changed: ${oldBreakpoint} → ${newBreakpoint}`);
    }
    
    dispatchOrientationChange(oldOrientation, newOrientation) {
        const event = new CustomEvent('orientationChange', {
            detail: { oldOrientation, newOrientation }
        });
        document.dispatchEvent(event);
        
        console.log(`🔄 Orientation changed: ${oldOrientation} → ${newOrientation}`);
    }
    
    // Utility methods
    getCurrentBreakpoint() {
        return this.currentBreakpoint;
    }
    
    isCurrentBreakpoint(breakpoint) {
        return this.currentBreakpoint === breakpoint;
    }
    
    isBreakpointUp(breakpoint) {
        const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];
        const currentIndex = breakpoints.indexOf(this.currentBreakpoint);
        const targetIndex = breakpoints.indexOf(breakpoint);
        return currentIndex >= targetIndex;
    }
    
    isBreakpointDown(breakpoint) {
        const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];
        const currentIndex = breakpoints.indexOf(this.currentBreakpoint);
        const targetIndex = breakpoints.indexOf(breakpoint);
        return currentIndex <= targetIndex;
    }
    
    getViewportSize() {
        return {
            width: this.viewport.width,
            height: this.viewport.height
        };
    }
    
    scrollToElement(element, offset = 0) {
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize Responsive Manager
const responsiveManager = new ResponsiveManager();

// Export for global use
window.responsiveManager = responsiveManager;

// Custom event listeners for responsive behavior
document.addEventListener('breakpointChange', (e) => {
    const { oldBreakpoint, newBreakpoint } = e.detail;
    
    // Handle mobile menu
    if (oldBreakpoint === 'md' && newBreakpoint === 'sm') {
        // Entering mobile
        document.body.classList.add('mobile-view');
    } else if (oldBreakpoint === 'sm' && newBreakpoint === 'md') {
        // Entering tablet/desktop
        document.body.classList.remove('mobile-view');
        closeMobileMenu();
    }
    
    // Handle layout changes
    handleLayoutChange(newBreakpoint);
});

document.addEventListener('orientationChange', (e) => {
    const { newOrientation } = e.detail;
    
    // Adjust layouts for orientation
    if (newOrientation === 'landscape') {
        document.body.classList.add('landscape-orientation');
    } else {
        document.body.classList.remove('landscape-orientation');
    }
});

document.addEventListener('swipe', (e) => {
    const { direction } = e.detail;
    
    // Handle swipe gestures
    if (direction === 'right' && window.scrollX === 0) {
        // Swipe from left edge - could open menu
        openMobileMenu();
    } else if (direction === 'left' && document.querySelector('.mobile-menu.active')) {
        // Swipe left - close menu
        closeMobileMenu();
    }
});

function handleLayoutChange(breakpoint) {
    // Adjust layouts based on breakpoint
    switch (breakpoint) {
        case 'xs':
        case 'sm':
            // Mobile layouts
            adjustMobileLayout();
            break;
        case 'md':
            // Tablet layouts
            adjustTabletLayout();
            break;
        case 'lg':
        case 'xl':
            // Desktop layouts
            adjustDesktopLayout();
            break;
    }
}

function adjustMobileLayout() {
    // Mobile-specific adjustments
    const grids = document.querySelectorAll('.responsive-grid');
    grids.forEach(grid => {
        grid.style.gridTemplateColumns = '1fr';
    });
    
    // Adjust typography
    document.documentElement.style.fontSize = '14px';
}

function adjustTabletLayout() {
    // Tablet-specific adjustments
    const grids = document.querySelectorAll('.responsive-grid');
    grids.forEach(grid => {
        grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    });
    
    // Adjust typography
    document.documentElement.style.fontSize = '15px';
}

function adjustDesktopLayout() {
    // Desktop-specific adjustments
    const grids = document.querySelectorAll('.responsive-grid');
    grids.forEach(grid => {
        grid.style.gridTemplateColumns = '';
    });
    
    // Adjust typography
    document.documentElement.style.fontSize = '16px';
}

// Performance monitoring
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log(`⚡ LCP: ${entry.startTime}ms`);
            } else if (entry.entryType === 'first-input') {
                console.log(`⚡ FID: ${entry.processingStart - entry.startTime}ms`);
            }
        }
    });
    
    perfObserver.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
}

console.log('📱 Enhanced Responsive JavaScript Loaded');