// Gallery functionality for SPACECORPZ website
class GalleryManager {
    constructor() {
        this.currentFilter = 'all';
        this.currentTab = 'consumer';
        this.init();
    }

    init() {
        this.initFilters();
        this.initSpecTabs();
        this.initGalleryItems();
        this.bindEvents();
    }

    initFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active filter button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Apply filter
                this.currentFilter = btn.getAttribute('data-filter');
                this.applyFilter();
            });
        });
    }

    applyFilter() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (this.currentFilter === 'all' || category === this.currentFilter) {
                item.style.display = 'block';
                item.classList.add('fade-in');
            } else {
                item.style.display = 'none';
                item.classList.remove('fade-in');
            }
        });

        // Animate filtered items
        setTimeout(() => {
            const visibleItems = document.querySelectorAll('.gallery-item:not([style*="none"])');
            visibleItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('slide-in-left');
                }, index * 100);
            });
        }, 100);
    }

    initSpecTabs() {
        const specTabs = document.querySelectorAll('.spec-tab');
        const specContents = document.querySelectorAll('.spec-content');
        
        specTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                specTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Show corresponding content
                const targetTab = tab.getAttribute('data-tab');
                this.currentTab = targetTab;
                
                specContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === targetTab) {
                        content.classList.add('active');
                        this.animateSpecItems(content);
                    }
                });
            });
        });
    }

    animateSpecItems(container) {
        const specItems = container.querySelectorAll('.spec-item');
        specItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    initGalleryItems() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            const viewDetailsBtn = item.querySelector('.view-details');
            
            if (viewDetailsBtn) {
                viewDetailsBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showDetailModal(item);
                });
            }

            // Add hover effects for video items
            const video = item.querySelector('video');
            if (video) {
                item.addEventListener('mouseenter', () => {
                    video.play();
                });
                
                item.addEventListener('mouseleave', () => {
                    video.pause();
                });
            }
        });
    }

    showDetailModal(item) {
        const category = item.getAttribute('data-category');
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        const img = item.querySelector('img');
        const imgSrc = img ? img.src : '';

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 2rem;
            animation: fadeIn 0.3s ease;
        `;

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.style.cssText = `
            background: var(--bg-secondary);
            border-radius: 16px;
            max-width: 800px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            border: 1px solid var(--border-primary);
            animation: slideInUp 0.3s ease;
        `;

        modalContent.innerHTML = `
            <button class="modal-close" style="
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                color: var(--text-primary);
                font-size: 2rem;
                cursor: pointer;
                z-index: 1;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            ">×</button>
            
            <div style="padding: 2rem;">
                ${imgSrc ? `<img src="${imgSrc}" alt="${title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 1.5rem;">` : ''}
                
                <div style="margin-bottom: 1rem;">
                    <span style="
                        background: var(--primary-color);
                        color: white;
                        padding: 0.25rem 0.75rem;
                        border-radius: 20px;
                        font-size: 0.75rem;
                        text-transform: uppercase;
                        font-weight: 600;
                    ">${category}</span>
                </div>
                
                <h2 style="color: var(--text-primary); margin-bottom: 1rem; font-size: 2rem;">${title}</h2>
                <p style="color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.6;">${description}</p>
                
                <div class="modal-specs" style="
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    margin-bottom: 2rem;
                ">
                    ${this.getSpecsForCategory(category)}
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button class="SPACECORPZ" onclick="this.closest('.modal-overlay').remove()">
                        Request Quote
                    </button>
                    <button class="cta-button secondary" onclick="this.closest('.modal-overlay').remove()">
                        Download Specs
                    </button>
                </div>
            </div>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.background = 'var(--error-color)';
            closeBtn.style.color = 'white';
        });

        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.background = 'none';
            closeBtn.style.color = 'var(--text-primary)';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Restore body scroll when modal is removed
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.removedNodes.forEach((node) => {
                        if (node === modal) {
                            document.body.style.overflow = '';
                            observer.disconnect();
                        }
                    });
                }
            });
        });
        observer.observe(document.body, { childList: true });

        // Add CSS animation styles
        if (!document.getElementById('modal-styles')) {
            const style = document.createElement('style');
            style.id = 'modal-styles';
            style.textContent = `
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(50px) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    getSpecsForCategory(category) {
        const specs = {
            consumer: [
                { label: 'Flight Time', value: '30 minutes' },
                { label: 'Max Speed', value: '65 km/h' },
                { label: 'Camera', value: '4K HDR' },
                { label: 'Range', value: '10 km' }
            ],
            commercial: [
                { label: 'Flight Time', value: '45 minutes' },
                { label: 'Max Speed', value: '90 km/h' },
                { label: 'Payload', value: '6 kg' },
                { label: 'Range', value: '15 km' }
            ],
            military: [
                { label: 'Flight Time', value: '8 hours' },
                { label: 'Max Speed', value: '150 km/h' },
                { label: 'Range', value: '100 km' },
                { label: 'Encryption', value: 'AES-256' }
            ],
            racing: [
                { label: 'Max Speed', value: '200 km/h' },
                { label: 'Acceleration', value: '0-100 in 2s' },
                { label: 'Weight', value: '450g' },
                { label: 'Response Time', value: '<10ms' }
            ]
        };

        const categorySpecs = specs[category] || specs.consumer;
        
        return categorySpecs.map(spec => `
            <div style="
                background: var(--bg-tertiary);
                padding: 1rem;
                border-radius: 8px;
                text-align: center;
                border: 1px solid var(--border-secondary);
            ">
                <div style="color: var(--primary-color); font-size: 0.875rem; text-transform: uppercase; margin-bottom: 0.5rem; font-weight: 600;">${spec.label}</div>
                <div style="color: var(--text-primary); font-size: 1.125rem; font-weight: 600;">${spec.value}</div>
            </div>
        `).join('');
    }

    bindEvents() {
        // Add search functionality (if search input exists)
        const searchInput = document.querySelector('#gallerySearch');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce((e) => {
                this.searchGallery(e.target.value);
            }, 300));
        }

        // Add lazy loading for images
        this.initLazyLoading();

        // Add fullscreen image viewing
        this.initImageViewer();
    }

    searchGallery(searchTerm) {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const term = searchTerm.toLowerCase().trim();
        
        galleryItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            const category = item.getAttribute('data-category').toLowerCase();
            
            const matches = title.includes(term) || 
                          description.includes(term) || 
                          category.includes(term);
            
            if (term === '' || matches) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    initLazyLoading() {
        const images = document.querySelectorAll('.gallery-item img');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    initImageViewer() {
        const galleryImages = document.querySelectorAll('.gallery-item img');
        
        galleryImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openImageViewer(img.src, img.alt);
            });
        });
    }

    openImageViewer(src, alt) {
        const viewer = document.createElement('div');
        viewer.className = 'image-viewer';
        viewer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;

        viewer.innerHTML = `
            <img src="${src}" alt="${alt}" style="
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 8px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
                animation: zoomIn 0.3s ease;
            ">
            <button style="
                position: absolute;
                top: 2rem;
                right: 2rem;
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                backdrop-filter: blur(10px);
            " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
               onmouseout="this.style.background='rgba(255,255,255,0.2)'">×</button>
        `;

        document.body.appendChild(viewer);
        document.body.style.overflow = 'hidden';

        viewer.addEventListener('click', () => {
            viewer.remove();
            document.body.style.overflow = '';
        });

        // Add CSS animation
        if (!document.getElementById('image-viewer-styles')) {
            const style = document.createElement('style');
            style.id = 'image-viewer-styles';
            style.textContent = `
                @keyframes zoomIn {
                    from {
                        transform: scale(0.8);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

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
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GalleryManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GalleryManager;
}