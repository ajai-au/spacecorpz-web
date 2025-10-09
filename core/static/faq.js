// FAQ functionality for SPACECORPZ website
class FAQManager {
    constructor() {
        this.currentCategory = 'all';
        this.searchTerm = '';
        this.init();
    }

    init() {
        this.initFAQToggles();
        this.initCategoryFilters();
        this.initSearch();
        this.bindEvents();
        this.initAnimations();
    }

    initFAQToggles() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', () => {
                // Close other items if you want accordion behavior
                // this.closeOtherItems(item);
                
                // Toggle current item
                const isActive = item.classList.contains('active');
                
                if (isActive) {
                    this.closeFAQItem(item);
                } else {
                    this.openFAQItem(item);
                }
            });
        });
    }

    openFAQItem(item) {
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        item.classList.add('active');
        
        // Animate the opening
        answer.style.maxHeight = answer.scrollHeight + 'px';
        toggle.style.transform = 'rotate(45deg)';
        
        // Add a subtle glow effect
        item.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.2)';
        item.style.borderColor = 'var(--primary-color)';
    }

    closeFAQItem(item) {
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        item.classList.remove('active');
        
        // Animate the closing
        answer.style.maxHeight = '0';
        toggle.style.transform = 'rotate(0deg)';
        
        // Remove glow effect
        item.style.boxShadow = '';
        item.style.borderColor = '';
    }

    closeOtherItems(activeItem) {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            if (item !== activeItem && item.classList.contains('active')) {
                this.closeFAQItem(item);
            }
        });
    }

    initCategoryFilters() {
        const categoryTabs = document.querySelectorAll('.category-tab');
        
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                categoryTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Apply filter
                this.currentCategory = tab.getAttribute('data-category');
                this.applyFilters();
            });
        });
    }

    initSearch() {
        const searchInput = document.getElementById('faqSearch');
        
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce((e) => {
                this.searchTerm = e.target.value.toLowerCase().trim();
                this.applyFilters();
            }, 300));

            // Add search icon animation
            searchInput.addEventListener('focus', () => {
                searchInput.parentElement.style.transform = 'scale(1.02)';
                searchInput.parentElement.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.2)';
            });

            searchInput.addEventListener('blur', () => {
                searchInput.parentElement.style.transform = 'scale(1)';
                searchInput.parentElement.style.boxShadow = '';
            });
        }
    }

    applyFilters() {
        const faqItems = document.querySelectorAll('.faq-item');
        const noResults = document.getElementById('noResults');
        let visibleCount = 0;
        
        faqItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');
            const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
            
            const categoryMatch = this.currentCategory === 'all' || category === this.currentCategory;
            const searchMatch = this.searchTerm === '' || 
                              question.includes(this.searchTerm) || 
                              answer.includes(this.searchTerm);
            
            if (categoryMatch && searchMatch) {
                item.style.display = 'block';
                item.classList.remove('hidden');
                visibleCount++;
                
                // Animate items appearing
                setTimeout(() => {
                    item.classList.add('fade-in');
                }, index * 50);
            } else {
                item.style.display = 'none';
                item.classList.add('hidden');
                item.classList.remove('fade-in');
                
                // Close item if it was open
                if (item.classList.contains('active')) {
                    this.closeFAQItem(item);
                }
            }
        });

        // Show/hide no results message
        if (visibleCount === 0) {
            noResults.style.display = 'block';
            noResults.classList.add('fade-in');
        } else {
            noResults.style.display = 'none';
            noResults.classList.remove('fade-in');
        }

        // Update results count (if you have a counter element)
        this.updateResultsCount(visibleCount);
    }

    updateResultsCount(count) {
        let counter = document.getElementById('resultsCounter');
        
        if (!counter) {
            counter = document.createElement('div');
            counter.id = 'resultsCounter';
            counter.style.cssText = `
                text-align: center;
                color: var(--text-muted);
                font-size: var(--font-size-sm);
                margin-bottom: var(--spacing-8);
                padding: var(--spacing-4);
            `;
            
            const faqSection = document.querySelector('.faq-section .container');
            faqSection.insertBefore(counter, faqSection.querySelector('.faq-grid'));
        }
        
        if (this.searchTerm || this.currentCategory !== 'all') {
            counter.textContent = `Showing ${count} result${count !== 1 ? 's' : ''}`;
            counter.style.display = 'block';
        } else {
            counter.style.display = 'none';
        }
    }

    bindEvents() {
        // Add keyboard navigation
        this.initKeyboardNavigation();
        
        // Add expand/collapse all functionality
        this.addBulkControls();
        
        // Add print-friendly version
        this.addPrintSupport();
    }

    initKeyboardNavigation() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            
            // Make focusable
            question.setAttribute('tabindex', '0');
            question.setAttribute('role', 'button');
            question.setAttribute('aria-expanded', 'false');
            
            // Add keyboard event listeners
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
                
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextItem = faqItems[index + 1];
                    if (nextItem) {
                        nextItem.querySelector('.faq-question').focus();
                    }
                }
                
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevItem = faqItems[index - 1];
                    if (prevItem) {
                        prevItem.querySelector('.faq-question').focus();
                    }
                }
            });
            
            // Update aria-expanded when toggled
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        const isActive = item.classList.contains('active');
                        question.setAttribute('aria-expanded', isActive.toString());
                    }
                });
            });
            
            observer.observe(item, { attributes: true });
        });
    }

    addBulkControls() {
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'faq-bulk-controls';
        controlsContainer.style.cssText = `
            text-align: center;
            margin-bottom: var(--spacing-8);
            display: flex;
            gap: var(--spacing-4);
            justify-content: center;
            flex-wrap: wrap;
        `;
        
        const expandAllBtn = document.createElement('button');
        expandAllBtn.className = 'cta-button secondary';
        expandAllBtn.textContent = 'Expand All';
        expandAllBtn.style.fontSize = 'var(--font-size-sm)';
        expandAllBtn.style.padding = 'var(--spacing-2) var(--spacing-4)';
        
        const collapseAllBtn = document.createElement('button');
        collapseAllBtn.className = 'cta-button secondary';
        collapseAllBtn.textContent = 'Collapse All';
        collapseAllBtn.style.fontSize = 'var(--font-size-sm)';
        collapseAllBtn.style.padding = 'var(--spacing-2) var(--spacing-4)';
        
        expandAllBtn.addEventListener('click', () => {
            const visibleItems = document.querySelectorAll('.faq-item:not(.hidden)');
            visibleItems.forEach(item => {
                if (!item.classList.contains('active')) {
                    this.openFAQItem(item);
                }
            });
        });
        
        collapseAllBtn.addEventListener('click', () => {
            const activeItems = document.querySelectorAll('.faq-item.active');
            activeItems.forEach(item => {
                this.closeFAQItem(item);
            });
        });
        
        controlsContainer.appendChild(expandAllBtn);
        controlsContainer.appendChild(collapseAllBtn);
        
        const faqGrid = document.querySelector('.faq-grid');
        faqGrid.parentNode.insertBefore(controlsContainer, faqGrid);
    }

    addPrintSupport() {
        // Add print styles
        const printStyles = document.createElement('style');
        printStyles.textContent = `
            @media print {
                .navbar,
                .footer,
                .faq-search,
                .faq-categories,
                .faq-bulk-controls,
                .faq-contact {
                    display: none !important;
                }
                
                .faq-item {
                    break-inside: avoid;
                    margin-bottom: 1rem;
                    border: 1px solid #ccc;
                }
                
                .faq-answer {
                    max-height: none !important;
                    display: block !important;
                    padding: 1rem !important;
                }
                
                .faq-toggle {
                    display: none;
                }
                
                .faq-question {
                    background: #f5f5f5;
                    border-bottom: 1px solid #ccc;
                }
            }
        `;
        document.head.appendChild(printStyles);
        
        // Add print button
        const printBtn = document.createElement('button');
        printBtn.className = 'cta-button secondary';
        printBtn.textContent = '🖨️ Print FAQ';
        printBtn.style.fontSize = 'var(--font-size-sm)';
        printBtn.style.padding = 'var(--spacing-2) var(--spacing-4)';
        printBtn.style.position = 'fixed';
        printBtn.style.bottom = '2rem';
        printBtn.style.right = '2rem';
        printBtn.style.zIndex = '1000';
        printBtn.style.boxShadow = 'var(--shadow-lg)';
        
        printBtn.addEventListener('click', () => {
            window.print();
        });
        
        document.body.appendChild(printBtn);
    }

    initAnimations() {
        // Animate FAQ items on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('slide-in-left');
                    }, index * 100);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.faq-item').forEach(item => {
            observer.observe(item);
        });

        // Add hover effects
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('mouseenter', () => {
                question.style.backgroundColor = 'var(--bg-accent)';
                question.style.transform = 'translateX(8px)';
            });
            
            question.addEventListener('mouseleave', () => {
                question.style.backgroundColor = '';
                question.style.transform = '';
            });
        });
    }

    // Utility functions
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

    // Export FAQ data for external use
    exportFAQData() {
        const faqItems = document.querySelectorAll('.faq-item');
        const faqData = [];
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3').textContent;
            const answer = item.querySelector('.faq-answer p').textContent;
            const category = item.getAttribute('data-category');
            
            faqData.push({
                question,
                answer,
                category
            });
        });
        
        return faqData;
    }
}

// Initialize FAQ when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FAQManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FAQManager;
}