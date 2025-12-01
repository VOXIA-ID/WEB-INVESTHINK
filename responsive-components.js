/**
 * ========================================
 * RESPONSIVE COMPONENTS JAVASCRIPT
 * INVESTHINK Platform
 * ========================================
 */

class ResponsiveComponents {
    constructor() {
        this.components = new Map();
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.setupModals();
        this.setupTabs();
        this.setupAccordions();
        this.setupCarousels();
        this.setupForms();
        this.setupTooltips();
        this.setupDropdowns();
        
        console.log('🧩 Responsive Components Initialized');
    }
    
    // ========================================
    // RESPONSIVE NAVIGATION
    // ========================================
    
    setupNavigation() {
        const navToggles = document.querySelectorAll('[data-nav-toggle]');
        const navOverlays = document.querySelectorAll('[data-nav-overlay]');
        const navPanels = document.querySelectorAll('[data-nav-panel]');
        const navCloses = document.querySelectorAll('[data-nav-close]');
        
        navToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                this.toggleNavigation(toggle);
            });
        });
        
        navOverlays.forEach(overlay => {
            overlay.addEventListener('click', () => {
                this.closeNavigation();
            });
        });
        
        navCloses.forEach(close => {
            close.addEventListener('click', () => {
                this.closeNavigation();
            });
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeNavigation();
            }
        });
        
        // Close on resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeNavigation();
            }
        });
    }
    
    toggleNavigation(toggle) {
        const targetId = toggle.getAttribute('data-nav-toggle');
        const panel = document.querySelector(`[data-nav-panel="${targetId}"]`);
        const overlay = document.querySelector(`[data-nav-overlay="${targetId}"]`);
        
        if (panel && overlay) {
            const isOpen = panel.classList.contains('active');
            
            if (isOpen) {
                this.closeNavigation();
            } else {
                this.openNavigation(panel, overlay);
            }
        }
    }
    
    openNavigation(panel, overlay) {
        panel.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        const firstFocusable = panel.querySelector('button, [href], input, select, textarea');
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
        }
    }
    
    closeNavigation() {
        const panels = document.querySelectorAll('[data-nav-panel].active');
        const overlays = document.querySelectorAll('[data-nav-overlay].active');
        
        panels.forEach(panel => {
            panel.classList.remove('active');
        });
        
        overlays.forEach(overlay => {
            overlay.classList.remove('active');
        });
        
        document.body.style.overflow = '';
    }
    
    // ========================================
    // RESPONSIVE MODALS
    // ========================================
    
    setupModals() {
        const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
        const modalCloses = document.querySelectorAll('[data-modal-close]');
        
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal(trigger);
            });
        });
        
        modalCloses.forEach(close => {
            close.addEventListener('click', () => {
                this.closeModal();
            });
        });
        
        // Close on overlay click
        document.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-modal')) {
                this.closeModal();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
    
    openModal(trigger) {
        const modalId = trigger.getAttribute('data-modal-trigger');
        const modal = document.querySelector(`[data-modal="${modalId}"]`);
        
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus management
            const firstFocusable = modal.querySelector('button, [href], input, select, textarea');
            if (firstFocusable) {
                setTimeout(() => firstFocusable.focus(), 100);
            }
            
            // Trap focus within modal
            this.trapFocus(modal);
        }
    }
    
    closeModal() {
        const modals = document.querySelectorAll('[data-modal].active');
        
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        
        document.body.style.overflow = '';
        this.removeFocusTrap();
    }
    
    trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        const focusTrapHandler = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };
        
        element.addEventListener('keydown', focusTrapHandler);
        element.setAttribute('data-focus-trap', 'true');
    }
    
    removeFocusTrap() {
        const trappedElements = document.querySelectorAll('[data-focus-trap="true"]');
        trappedElements.forEach(element => {
            element.removeEventListener('keydown', this.focusTrapHandler);
            element.removeAttribute('data-focus-trap');
        });
    }
    
    // ========================================
    // RESPONSIVE TABS
    // ========================================
    
    setupTabs() {
        const tabGroups = document.querySelectorAll('[data-tabs]');
        
        tabGroups.forEach(group => {
            const tabTriggers = group.querySelectorAll('[data-tab-trigger]');
            const tabPanels = group.querySelectorAll('[data-tab-panel]');
            
            tabTriggers.forEach(trigger => {
                trigger.addEventListener('click', () => {
                    this.switchTab(trigger, tabTriggers, tabPanels);
                });
                
                trigger.addEventListener('keydown', (e) => {
                    this.handleTabKeyboard(e, trigger, tabTriggers, tabPanels);
                });
            });
        });
    }
    
    switchTab(activeTrigger, allTriggers, allPanels) {
        const targetId = activeTrigger.getAttribute('data-tab-trigger');
        const targetPanel = document.querySelector(`[data-tab-panel="${targetId}"]`);
        
        // Update triggers
        allTriggers.forEach(trigger => {
            trigger.setAttribute('aria-selected', 'false');
            trigger.classList.remove('active');
        });
        
        activeTrigger.setAttribute('aria-selected', 'true');
        activeTrigger.classList.add('active');
        
        // Update panels
        allPanels.forEach(panel => {
            panel.setAttribute('aria-hidden', 'true');
            panel.classList.remove('active');
        });
        
        if (targetPanel) {
            targetPanel.setAttribute('aria-hidden', 'false');
            targetPanel.classList.add('active');
        }
    }
    
    handleTabKeyboard(e, currentTrigger, allTriggers, allPanels) {
        const currentIndex = Array.from(allTriggers).indexOf(currentTrigger);
        let newIndex;
        
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                newIndex = currentIndex > 0 ? currentIndex - 1 : allTriggers.length - 1;
                allTriggers[newIndex].focus();
                this.switchTab(allTriggers[newIndex], allTriggers, allPanels);
                break;
                
            case 'ArrowRight':
                e.preventDefault();
                newIndex = currentIndex < allTriggers.length - 1 ? currentIndex + 1 : 0;
                allTriggers[newIndex].focus();
                this.switchTab(allTriggers[newIndex], allTriggers, allPanels);
                break;
                
            case 'Home':
                e.preventDefault();
                allTriggers[0].focus();
                this.switchTab(allTriggers[0], allTriggers, allPanels);
                break;
                
            case 'End':
                e.preventDefault();
                allTriggers[allTriggers.length - 1].focus();
                this.switchTab(allTriggers[allTriggers.length - 1], allTriggers, allPanels);
                break;
        }
    }
    
    // ========================================
    // RESPONSIVE ACCORDIONS
    // ========================================
    
    setupAccordions() {
        const accordionTriggers = document.querySelectorAll('[data-accordion-trigger]');
        
        accordionTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                this.toggleAccordion(trigger);
            });
            
            trigger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleAccordion(trigger);
                }
            });
        });
    }
    
    toggleAccordion(trigger) {
        const targetId = trigger.getAttribute('data-accordion-trigger');
        const targetPanel = document.querySelector(`[data-accordion-panel="${targetId}"]`);
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        
        if (targetPanel) {
            if (isExpanded) {
                trigger.setAttribute('aria-expanded', 'false');
                targetPanel.setAttribute('aria-hidden', 'true');
                targetPanel.classList.remove('active');
            } else {
                trigger.setAttribute('aria-expanded', 'true');
                targetPanel.setAttribute('aria-hidden', 'false');
                targetPanel.classList.add('active');
            }
        }
    }
    
    // ========================================
    // RESPONSIVE CAROUSELS
    // ========================================
    
    setupCarousels() {
        const carousels = document.querySelectorAll('[data-carousel]');
        
        carousels.forEach(carousel => {
            this.initCarousel(carousel);
        });
    }
    
    initCarousel(carousel) {
        const slides = carousel.querySelectorAll('[data-carousel-slide]');
        const prevBtn = carousel.querySelector('[data-carousel-prev]');
        const nextBtn = carousel.querySelector('[data-carousel-next]');
        const indicators = carousel.querySelectorAll('[data-carousel-indicator]');
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        
        const showSlide = (index) => {
            // Hide all slides
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                slide.setAttribute('aria-hidden', 'true');
            });
            
            // Show current slide
            slides[index].classList.add('active');
            slides[index].setAttribute('aria-hidden', 'false');
            
            // Update indicators
            indicators.forEach((indicator, i) => {
                indicator.classList.remove('active');
                indicator.setAttribute('aria-selected', 'false');
            });
            
            if (indicators[index]) {
                indicators[index].classList.add('active');
                indicators[index].setAttribute('aria-selected', 'true');
            }
            
            currentIndex = index;
        };
        
        const nextSlide = () => {
            const nextIndex = (currentIndex + 1) % totalSlides;
            showSlide(nextIndex);
        };
        
        const prevSlide = () => {
            const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            showSlide(prevIndex);
        };
        
        // Button events
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        // Indicator events
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Touch events
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }, { passive: true });
        
        // Auto-play (optional)
        const autoplay = carousel.hasAttribute('data-carousel-autoplay');
        if (autoplay) {
            const interval = setInterval(nextSlide, 5000);
            
            carousel.addEventListener('mouseenter', () => clearInterval(interval));
            carousel.addEventListener('mouseleave', () => {
                setInterval(nextSlide, 5000);
            });
        }
        
        // Initialize first slide
        showSlide(0);
    }
    
    // ========================================
    // RESPONSIVE FORMS
    // ========================================
    
    setupForms() {
        const forms = document.querySelectorAll('[data-form]');
        
        forms.forEach(form => {
            this.setupFormValidation(form);
            this.setupFormEnhancements(form);
        });
    }
    
    setupFormValidation(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateInput(input);
            });
            
            input.addEventListener('input', () => {
                this.clearInputError(input);
            });
        });
        
        form.addEventListener('submit', (e) => {
            if (!this.validateForm(form)) {
                e.preventDefault();
            }
        });
    }
    
    validateInput(input) {
        const isValid = input.checkValidity();
        const errorMessage = this.getErrorMessage(input);
        
        if (!isValid) {
            this.showInputError(input, errorMessage);
        } else {
            this.clearInputError(input);
        }
        
        return isValid;
    }
    
    validateForm(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateInput(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    getErrorMessage(input) {
        if (input.validity.valueMissing) {
            return 'This field is required';
        }
        if (input.validity.typeMismatch) {
            return 'Please enter a valid value';
        }
        if (input.validity.tooShort) {
            return `Minimum length is ${input.minLength} characters`;
        }
        if (input.validity.tooLong) {
            return `Maximum length is ${input.maxLength} characters`;
        }
        if (input.validity.patternMismatch) {
            return 'Please match the required format';
        }
        return 'Please enter a valid value';
    }
    
    showInputError(input, message) {
        this.clearInputError(input);
        
        input.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
        
        input.parentNode.appendChild(errorElement);
    }
    
    clearInputError(input) {
        input.classList.remove('error');
        
        const errorElement = input.parentNode.querySelector('.form-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    setupFormEnhancements(form) {
        // Floating labels
        const inputs = form.querySelectorAll('input[placeholder], textarea[placeholder]');
        
        inputs.forEach(input => {
            const wrapper = document.createElement('div');
            wrapper.className = 'form-floating-label';
            
            const label = document.createElement('label');
            label.textContent = input.placeholder;
            label.setAttribute('for', input.id || `input-${Date.now()}`);
            
            if (!input.id) {
                input.id = label.getAttribute('for');
            }
            
            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(input);
            wrapper.appendChild(label);
            
            input.addEventListener('focus', () => {
                wrapper.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                wrapper.classList.remove('focused');
                if (input.value) {
                    wrapper.classList.add('has-value');
                } else {
                    wrapper.classList.remove('has-value');
                }
            });
            
            // Check initial value
            if (input.value) {
                wrapper.classList.add('has-value');
            }
        });
    }
    
    // ========================================
    // RESPONSIVE TOOLTIPS
    // ========================================
    
    setupTooltips() {
        const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
        
        tooltipTriggers.forEach(trigger => {
            this.createTooltip(trigger);
        });
    }
    
    createTooltip(trigger) {
        const tooltipText = trigger.getAttribute('data-tooltip');
        const tooltipPosition = trigger.getAttribute('data-tooltip-position') || 'top';
        
        const tooltip = document.createElement('div');
        tooltip.className = `tooltip tooltip-${tooltipPosition}`;
        tooltip.textContent = tooltipText;
        tooltip.setAttribute('role', 'tooltip');
        
        document.body.appendChild(tooltip);
        
        const showTooltip = () => {
            const rect = trigger.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            // Position tooltip
            switch (tooltipPosition) {
                case 'top':
                    tooltip.style.left = rect.left + (rect.width / 2) - (tooltipRect.width / 2) + 'px';
                    tooltip.style.top = rect.top - tooltipRect.height - 10 + 'px';
                    break;
                case 'bottom':
                    tooltip.style.left = rect.left + (rect.width / 2) - (tooltipRect.width / 2) + 'px';
                    tooltip.style.top = rect.bottom + 10 + 'px';
                    break;
                case 'left':
                    tooltip.style.left = rect.left - tooltipRect.width - 10 + 'px';
                    tooltip.style.top = rect.top + (rect.height / 2) - (tooltipRect.height / 2) + 'px';
                    break;
                case 'right':
                    tooltip.style.left = rect.right + 10 + 'px';
                    tooltip.style.top = rect.top + (rect.height / 2) - (tooltipRect.height / 2) + 'px';
                    break;
            }
            
            tooltip.classList.add('visible');
        };
        
        const hideTooltip = () => {
            tooltip.classList.remove('visible');
        };
        
        // Mouse events
        trigger.addEventListener('mouseenter', showTooltip);
        trigger.addEventListener('mouseleave', hideTooltip);
        
        // Touch events
        trigger.addEventListener('touchstart', (e) => {
            e.preventDefault();
            showTooltip();
        });
        
        trigger.addEventListener('touchend', (e) => {
            e.preventDefault();
            setTimeout(hideTooltip, 2000);
        });
        
        // Focus events
        trigger.addEventListener('focus', showTooltip);
        trigger.addEventListener('blur', hideTooltip);
    }
    
    // ========================================
    // RESPONSIVE DROPDOWNS
    // ========================================
    
    setupDropdowns() {
        const dropdowns = document.querySelectorAll('[data-dropdown]');
        
        dropdowns.forEach(dropdown => {
            this.initDropdown(dropdown);
        });
    }
    
    initDropdown(dropdown) {
        const trigger = dropdown.querySelector('[data-dropdown-trigger]');
        const menu = dropdown.querySelector('[data-dropdown-menu]');
        const items = dropdown.querySelectorAll('[data-dropdown-item]');
        
        const toggleDropdown = (e) => {
            e.preventDefault();
            const isOpen = menu.classList.contains('active');
            
            // Close all other dropdowns
            document.querySelectorAll('[data-dropdown-menu].active').forEach(otherMenu => {
                otherMenu.classList.remove('active');
                otherMenu.setAttribute('aria-hidden', 'true');
            });
            
            if (!isOpen) {
                menu.classList.add('active');
                menu.setAttribute('aria-hidden', 'false');
                trigger.setAttribute('aria-expanded', 'true');
            } else {
                menu.classList.remove('active');
                menu.setAttribute('aria-hidden', 'true');
                trigger.setAttribute('aria-expanded', 'false');
            }
        };
        
        const closeDropdown = () => {
            menu.classList.remove('active');
            menu.setAttribute('aria-hidden', 'true');
            trigger.setAttribute('aria-expanded', 'false');
        };
        
        // Trigger events
        trigger.addEventListener('click', toggleDropdown);
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                toggleDropdown(e);
            }
        });
        
        // Item events
        items.forEach(item => {
            item.addEventListener('click', () => {
                closeDropdown();
            });
        });
        
        // Keyboard navigation
        menu.addEventListener('keydown', (e) => {
            const focusableItems = Array.from(menu.querySelectorAll('[data-dropdown-item]'));
            const currentIndex = focusableItems.indexOf(document.activeElement);
            let newIndex;
            
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    newIndex = currentIndex < focusableItems.length - 1 ? currentIndex + 1 : 0;
                    focusableItems[newIndex].focus();
                    break;
                    
                case 'ArrowUp':
                    e.preventDefault();
                    newIndex = currentIndex > 0 ? currentIndex - 1 : focusableItems.length - 1;
                    focusableItems[newIndex].focus();
                    break;
                    
                case 'Escape':
                    closeDropdown();
                    trigger.focus();
                    break;
            }
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                closeDropdown();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('active')) {
                closeDropdown();
            }
        });
    }
    
    // ========================================
    // UTILITY METHODS
    // ========================================
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Get viewport information
    getViewport() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            scrollX: window.scrollX,
            scrollY: window.scrollY
        };
    }
    
    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Smooth scroll to element
    scrollToElement(element, offset = 0) {
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize Responsive Components
const responsiveComponents = new ResponsiveComponents();

// Export for global use
window.responsiveComponents = responsiveComponents;

console.log('🧩 Responsive Components JavaScript Loaded');