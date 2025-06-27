// Product Landing Page JavaScript
// Created by MiniMax Agent

// Configuration
const CONFIG = {
    product: {
        name: 'LavaStick',
        price: 79.99,
        originalPrice: 129.99,
        currency: '$'
    },
    company: {
        name: 'StreamMax Pro',
        email: 'support@streammaxpro.com',
        phone: '1-800-555-0123'
    }
};

// DOM Elements
const orderModal = document.getElementById('orderModal');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeScrollEffects();
    initializeFormValidation();
    console.log('Product Landing Page initialized successfully');
});

// Handle order button clicks
function handleOrder() {
    // Track the click event (you can integrate analytics here)
    trackEvent('order_button_clicked', {
        product: CONFIG.product.name,
        price: CONFIG.product.price
    });
    
    // Show order modal
    showOrderModal();
}

// Show order modal
function showOrderModal() {
    orderModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Focus on the first input
    setTimeout(() => {
        const firstInput = orderModal.querySelector('input[type="email"]');
        if (firstInput) firstInput.focus();
    }, 100);
}

// Close modal
function closeModal() {
    orderModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target === orderModal) {
        closeModal();
    }
};

// Handle support links
function showSupport(type) {
    const supportMessages = {
        'customer-service': 'For customer service, please email us at ' + CONFIG.company.email + ' or call ' + CONFIG.company.phone,
        'setup-guide': 'Setup Guide: 1) Connect LavaStick to HDMI port 2) Connect power 3) Follow on-screen instructions 4) Enjoy!',
        'faq': 'Frequently Asked Questions:\n\n• How long does shipping take? 3-5 business days\n• Is there a warranty? Yes, 30-day money-back guarantee\n• Technical support? Available 24/7',
        'returns': 'Returns: We offer a 30-day money-back guarantee. Contact us at ' + CONFIG.company.email + ' to initiate a return.'
    };
    
    alert(supportMessages[type] || 'Support information not available.');
    
    // Track support interaction
    trackEvent('support_clicked', { type: type });
}

// Handle live chat
function openLiveChat() {
    // In a real implementation, this would open your live chat widget
    alert('Live Chat: Our support team is available 24/7. For immediate assistance, please call ' + CONFIG.company.phone + ' or email ' + CONFIG.company.email);
    
    trackEvent('live_chat_clicked');
}

// Initialize animations
function initializeAnimations() {
    // Add fade-in animation to elements as they come into view
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
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize scroll effects
function initializeScrollEffects() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const header = document.querySelector('.header');
        
        // Header shadow on scroll
        if (currentScrollY > 10) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Initialize form validation
function initializeFormValidation() {
    const orderForm = document.querySelector('.order-form');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(orderForm);
            const email = orderForm.querySelector('input[type="email"]').value;
            const name = orderForm.querySelector('input[placeholder="Full Name"]').value;
            
            if (validateOrderForm(email, name)) {
                processOrder(formData);
            }
        });
    }
}

// Validate order form
function validateOrderForm(email, name) {
    if (!email || !isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    if (!name || name.length < 2) {
        alert('Please enter your full name.');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Process order (integrate with your payment system)
function processOrder(formData) {
    // Show loading state
    const submitButton = document.querySelector('.order-form button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;
    
    // Simulate order processing
    setTimeout(() => {
        alert('Thank you for your order! You will receive a confirmation email shortly.');
        closeModal();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Clear form
        document.querySelector('.order-form').reset();
        
        // Track conversion
        trackEvent('order_completed', {
            product: CONFIG.product.name,
            value: CONFIG.product.price
        });
    }, 2000);
}

// Analytics tracking (integrate with your analytics platform)
function trackEvent(eventName, properties = {}) {
    // Google Analytics 4 example
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Facebook Pixel example
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, properties);
    }
    
    // Console log for debugging
    console.log('Event tracked:', eventName, properties);
}

// Utility functions
const Utils = {
    // Format price
    formatPrice: (price) => {
        return CONFIG.product.currency + price.toFixed(2);
    },
    
    // Smooth scroll to element
    scrollTo: (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    },
    
    // Copy text to clipboard
    copyToClipboard: (text) => {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard:', text);
        });
    }
};

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape' && orderModal.style.display === 'block') {
        closeModal();
    }
    
    // Quick order with Ctrl+Enter
    if (e.ctrlKey && e.key === 'Enter') {
        handleOrder();
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    // Log page load time
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    
    // Track page load
    trackEvent('page_loaded', {
        load_time: Math.round(loadTime),
        page: window.location.pathname
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // Track errors (optional)
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        line: e.lineno
    });
});

// Device detection
const DeviceDetector = {
    isMobile: () => window.innerWidth <= 768,
    isTablet: () => window.innerWidth > 768 && window.innerWidth <= 1024,
    isDesktop: () => window.innerWidth > 1024
};

// Optimize for mobile
if (DeviceDetector.isMobile()) {
    // Mobile-specific optimizations
    document.body.classList.add('mobile-device');
    
    // Disable hover effects on mobile
    const style = document.createElement('style');
    style.textContent = `
        @media (hover: none) {
            .feature-card:hover,
            .cta-button:hover {
                transform: none;
                box-shadow: initial;
            }
        }
    `;
    document.head.appendChild(style);
}

// Export for external use
window.ProductLanding = {
    handleOrder,
    showSupport,
    openLiveChat,
    Utils,
    CONFIG
};

console.log('🚀 Product Landing Page JavaScript loaded successfully!');
console.log('📝 Template created by MiniMax Agent');