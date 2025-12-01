/**
 * ========================================
 * MOBILE MENU FIX JAVASCRIPT
 * ========================================
 */

// Enhanced mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 Initializing mobile menu fix...');
    
    // Get all mobile menu elements
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu a');
    
    // Debug: Log found elements
    console.log('Mobile menu elements found:', {
        toggle: !!mobileMenuToggle,
        menu: !!mobileMenu,
        overlay: !!mobileMenuOverlay,
        close: !!mobileMenuClose,
        links: mobileNavLinks.length
    });
    
    // Force mobile menu toggle to be visible on mobile
    function forceMobileMenuVisibility() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            console.log('📱 Mobile detected, forcing menu visibility...');
            
            if (mobileMenuToggle) {
                mobileMenuToggle.style.display = 'flex';
                mobileMenuToggle.style.visibility = 'visible';
                mobileMenuToggle.style.opacity = '1';
                mobileMenuToggle.style.position = 'relative';
                mobileMenuToggle.style.zIndex = '1002';
            }
            
            // Hide desktop buttons
            const desktopButtons = document.querySelectorAll('.nav-actions .btn-secondary, .nav-actions .btn-primary, .nav-actions .globe-btn, .nav-actions .theme-btn');
            desktopButtons.forEach(btn => {
                btn.style.display = 'none';
            });
        } else {
            console.log('🖥️ Desktop detected, hiding mobile menu...');
            
            if (mobileMenuToggle) {
                mobileMenuToggle.style.display = 'none';
            }
            
            // Show desktop buttons
            const desktopButtons = document.querySelectorAll('.nav-actions .btn-secondary, .nav-actions .btn-primary, .nav-actions .globe-btn, .nav-actions .theme-btn');
            desktopButtons.forEach(btn => {
                btn.style.display = '';
            });
        }
    }
    
    // Enhanced open mobile menu function
    function openMobileMenu() {
        console.log('📂 Opening mobile menu...');
        
        if (mobileMenu) {
            mobileMenu.classList.add('active');
            mobileMenu.style.right = '0';
        }
        
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.add('active');
            mobileMenuOverlay.style.display = 'block';
        }
        
        document.body.style.overflow = 'hidden';
        document.body.classList.add('mobile-menu-open');
        
        // Add ARIA attributes
        if (mobileMenuToggle) {
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
        }
    }
    
    // Enhanced close mobile menu function
    function closeMobileMenu() {
        console.log('📂 Closing mobile menu...');
        
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            mobileMenu.style.right = '-100%';
        }
        
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('active');
            mobileMenuOverlay.style.display = 'none';
        }
        
        document.body.style.overflow = '';
        document.body.classList.remove('mobile-menu-open');
        
        // Add ARIA attributes
        if (mobileMenuToggle) {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    }
    
    // Toggle mobile menu
    function toggleMobileMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = mobileMenu && mobileMenu.classList.contains('active');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    // Setup event listeners with better error handling
    function setupEventListeners() {
        // Mobile menu toggle
        if (mobileMenuToggle) {
            // Remove existing listeners to prevent duplicates
            mobileMenuToggle.removeEventListener('click', toggleMobileMenu);
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
            
            // Touch events for better mobile support
            mobileMenuToggle.addEventListener('touchstart', (e) => {
                e.preventDefault();
                toggleMobileMenu(e);
            }, { passive: true });
            
            console.log('✅ Mobile menu toggle listener attached');
        } else {
            console.error('❌ Mobile menu toggle not found!');
        }
        
        // Mobile menu close
        if (mobileMenuClose) {
            mobileMenuClose.removeEventListener('click', closeMobileMenu);
            mobileMenuClose.addEventListener('click', (e) => {
                e.preventDefault();
                closeMobileMenu();
            });
            
            console.log('✅ Mobile menu close listener attached');
        }
        
        // Mobile menu overlay
        if (mobileMenuOverlay) {
            mobileMenuOverlay.removeEventListener('click', closeMobileMenu);
            mobileMenuOverlay.addEventListener('click', closeMobileMenu);
            
            console.log('✅ Mobile menu overlay listener attached');
        }
        
        // Mobile nav links
        if (mobileNavLinks.length > 0) {
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    closeMobileMenu();
                });
            });
            
            console.log(`✅ ${mobileNavLinks.length} mobile nav link listeners attached`);
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            forceMobileMenuVisibility();
            
            // Close menu on resize to desktop
            if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(forceMobileMenuVisibility, 100);
        });
    }
    
    // Initialize everything
    function init() {
        forceMobileMenuVisibility();
        setupEventListeners();
        
        // Add debug class for testing
        document.body.classList.add('mobile-menu-fixed');
        
        console.log('🎉 Mobile menu fix initialized successfully!');
    }
    
    // Initialize immediately
    init();
    
    // Also initialize on DOM ready (backup)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    }
    
    // Expose functions globally for debugging
    window.mobileMenuFix = {
        open: openMobileMenu,
        close: closeMobileMenu,
        toggle: toggleMobileMenu,
        forceVisibility: forceMobileMenuVisibility
    };
    
    console.log('🔧 Mobile menu fix loaded. Use window.mobileMenuFix.open() to test.');
});