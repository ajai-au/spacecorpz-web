// News page functionality for SPACECORPZ website
class NewsManager {
    constructor() {
        this.currentFilter = 'all';
        this.currentPage = 1;
        this.articlesPerPage = 6;
        this.allArticles = [];
        this.filteredArticles = [];
        this.searchTerm = '';
        this.init();
    }

    init() {
        this.initSampleData();
        this.initFilters();
        this.initSearch();
        this.loadArticles();
        this.initLoadMore();
        this.initNewsletterForm();
        this.bindEvents();
    }

    initSampleData() {
        // Sample article data - this would normally come from your Django backend API
        this.allArticles = [
            {
                id: 1,
                title: "Revolutionary AI Navigation System Unveiled",
                excerpt: "Our latest breakthrough in artificial intelligence brings autonomous navigation to a new level.",
                content: "The new AI system can adapt to changing environments in real-time, ensuring safer flights.",
                category: "technology",
                image: "https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=600",
                date: "2025-01-15",
                readTime: "5 min",
                author: "Dr. Sarah Chen",
                tags: ["AI", "Navigation", "Innovation"]
            },
            {
                id: 2,
                title: "Drone Delivery Market Reaches $2.2 Billion",
                excerpt: "The global drone delivery market has experienced unprecedented growth this year.",
                content: "Major retailers are adopting UAV solutions for last-mile delivery operations.",
                category: "industry",
                image: "https://images.pexels.com/photos/2876511/pexels-photo-2876511.jpeg?auto=compress&cs=tinysrgb&w=600",
                date: "2025-01-12",
                readTime: "3 min",
                author: "Michael Rodriguez",
                tags: ["Market", "Delivery", "Growth"]
            },
            {
                id: 3,
                title: "New Manufacturing Facility Opens in Texas",
                excerpt: "Our expanded production capabilities will meet growing demand while maintaining quality.",
                content: "The 50,000 sq ft facility will triple our manufacturing capacity by Q2 2025.",
                category: "company",
                image: "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=600",
                date: "2025-01-10",
                readTime: "4 min",
                author: "Jennifer Park",
                tags: ["Manufacturing", "Expansion", "Texas"]
            },
            {
                id: 4,
                title: "Battery Technology Extends Flight Time by 40%",
                excerpt: "Revolutionary lithium-graphene hybrid batteries represent a major leap forward.",
                content: "The new battery technology provides longer flight times with faster charging.",
                category: "technology",
                image: "https://images.pexels.com/photos/18069329/pexels-photo-18069329/free-photo-of-drone-flying-over-forest.jpeg?auto=compress&cs=tinysrgb&w=600",
                date: "2025-01-08",
                readTime: "6 min",
                author: "Dr. Alex Kumar",
                tags: ["Battery", "Innovation", "Performance"]
            },
            {
                id: 5,
                title: "Complete Guide to Drone Maintenance",
                excerpt: "Essential tips and procedures to keep your SPACECORPZ drone in optimal condition.",
                content: "Regular maintenance ensures reliable operation and extends drone lifespan.",
                category: "tutorial",
                image: "https://images.pexels.com/photos/724921/pexels-photo-724921.jpeg?auto=compress&cs=tinysrgb&w=600",
                date: "2025-01-05",
                readTime: "8 min",
                author: "Tech Support Team",
                tags: ["Maintenance", "Tutorial", "Tips"]
            },
            {
                id: 6,
                title: "FAA Expands Commercial Drone Operations",
                excerpt: "New regulations open opportunities while maintaining safety standards.",
                content: "Recent regulatory changes benefit commercial drone operators nationwide.",
                category: "industry",
                image: "https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&w=600",
                date: "2025-01-03",
                readTime: "5 min",
                author: "Legal Team",
                tags: ["Regulations", "FAA", "Commercial"]
            },
            {
                id: 7,
                title: "Strategic Partnership Announced",
                excerpt: "Collaboration will accelerate development of autonomous flight systems.",
                content: "The partnership brings together expertise in AI and aerospace engineering.",
                category: "company",
                image: "https://images.pexels.com/photos/2480807/pexels-photo-2480807.jpeg?auto=compress&cs=tinysrgb&w=600",
                date: "2024-12-28",
                readTime: "3 min",
                author: "Corporate Communications",
                tags: ["Partnership", "Collaboration", "Technology"]
            },
            {
                id: 8,
                title: "Winter Flying Safety Guidelines",
                excerpt: "Essential precautions for operating drones in cold weather conditions.",
                content: "Cold weather affects battery performance and flight characteristics.",
                category: "tutorial",
                image: "https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=600",
                date: "2024-12-25",
                readTime: "7 min",
                author: "Safety Team",
                tags: ["Safety", "Winter", "Weather"]
            }
        ];
    }

    initFilters() {
        const filterBtns = document.querySelectorAll('.news-filters .filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active filter
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Apply filter
                this.currentFilter = btn.getAttribute('data-category');
                this.currentPage = 1; // Reset pagination
                this.applyFilters();
            });
        });
    }

    initSearch() {
        const searchInput = document.getElementById('newsSearch');
        const refreshBtn = document.getElementById('refreshNews');
        
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce((e) => {
                this.searchTerm = e.target.value.toLowerCase().trim();
                this.currentPage = 1; // Reset pagination
                this.applyFilters();
            }, 300));
        }
        
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refreshNews();
            });
        }
    }

    applyFilters() {
        this.filteredArticles = this.allArticles.filter(article => {
            const categoryMatch = this.currentFilter === 'all' || article.category === this.currentFilter;
            const searchMatch = this.searchTerm === '' || 
                              article.title.toLowerCase().includes(this.searchTerm) ||
                              article.excerpt.toLowerCase().includes(this.searchTerm) ||
                              article.tags.some(tag => tag.toLowerCase().includes(this.searchTerm));
            
            return categoryMatch && searchMatch;
        });

        this.loadArticles();
    }

    loadArticles() {
        const newsGrid = document.getElementById('newsGrid');
        const loadingIndicator = document.getElementById('loadingIndicator');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        
        if (!newsGrid) return;

        // Show loading
        loadingIndicator.style.display = 'block';
        
        setTimeout(() => {
            // Clear existing articles
            if (this.currentPage === 1) {
                newsGrid.innerHTML = '';
            }
            
            // Calculate articles to show
            const startIndex = (this.currentPage - 1) * this.articlesPerPage;
            const endIndex = startIndex + this.articlesPerPage;
            const articlesToShow = this.filteredArticles.slice(startIndex, endIndex);
            
            // Render articles
            articlesToShow.forEach((article, index) => {
                const articleElement = this.createArticleElement(article);
                newsGrid.appendChild(articleElement);
                
                // Animate article appearance
                setTimeout(() => {
                    articleElement.classList.add('fade-in');
                }, index * 100);
            });
            
            // Hide loading
            loadingIndicator.style.display = 'none';
            
            // Update load more button
            const hasMore = this.filteredArticles.length > endIndex;
            loadMoreBtn.style.display = hasMore ? 'block' : 'none';
            
            // Update results count
            this.updateResultsInfo();
            
        }, 800); // Simulate loading delay
    }

    createArticleElement(article) {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'news-article';
        articleDiv.setAttribute('data-category', article.category);
        
        articleDiv.innerHTML = `
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
                <div class="article-badge">${this.formatCategory(article.category)}</div>
            </div>
            <div class="article-content">
                <div class="article-meta">
                    <span class="category">${this.formatCategory(article.category)}</span>
                    <span class="date">${this.formatDate(article.date)}</span>
                    <span class="read-time">${article.readTime} read</span>
                </div>
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                <div class="article-footer">
                    <div class="article-tags">
                        ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <button class="read-more" data-article-id="${article.id}">
                        Read Full Article →
                    </button>
                </div>
            </div>
        `;
        
        // Add click handler for read more
        const readMoreBtn = articleDiv.querySelector('.read-more');
        readMoreBtn.addEventListener('click', () => {
            this.showArticleModal(article);
        });
        
        // Add hover effects
        articleDiv.addEventListener('mouseenter', () => {
            articleDiv.style.transform = 'translateY(-8px)';
        });
        
        articleDiv.addEventListener('mouseleave', () => {
            articleDiv.style.transform = 'translateY(0)';
        });
        
        return articleDiv;
    }

    showArticleModal(article) {
        const modal = document.createElement('div');
        modal.className = 'article-modal';
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
                <img src="${article.image}" alt="${article.title}" style="
                    width: 100%;
                    height: 300px;
                    object-fit: cover;
                    border-radius: 12px;
                    margin-bottom: 1.5rem;
                ">
                
                <div class="article-meta" style="
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1rem;
                    flex-wrap: wrap;
                ">
                    <span style="
                        background: var(--primary-color);
                        color: white;
                        padding: 0.25rem 0.75rem;
                        border-radius: 20px;
                        font-size: 0.75rem;
                        text-transform: uppercase;
                        font-weight: 600;
                    ">${this.formatCategory(article.category)}</span>
                    <span style="color: var(--text-muted); font-size: 0.875rem;">${this.formatDate(article.date)}</span>
                    <span style="color: var(--text-muted); font-size: 0.875rem;">${article.readTime} read</span>
                    <span style="color: var(--text-muted); font-size: 0.875rem;">By ${article.author}</span>
                </div>
                
                <h1 style="color: var(--text-primary); margin-bottom: 1rem; font-size: 2rem; line-height: 1.2;">
                    ${article.title}
                </h1>
                
                <div style="margin-bottom: 1.5rem;">
                    ${article.tags.map(tag => `
                        <span style="
                            display: inline-block;
                            background: var(--bg-tertiary);
                            color: var(--text-secondary);
                            padding: 0.25rem 0.5rem;
                            border-radius: 12px;
                            font-size: 0.75rem;
                            margin-right: 0.5rem;
                            margin-bottom: 0.5rem;
                            border: 1px solid var(--border-secondary);
                        ">#${tag}</span>
                    `).join('')}
                </div>
                
                <div style="color: var(--text-secondary); line-height: 1.7; font-size: 1.1rem; margin-bottom: 2rem;">
                    <p style="font-size: 1.2rem; font-weight: 500; color: var(--text-primary); margin-bottom: 1rem;">
                        ${article.excerpt}
                    </p>
                    <p>${article.content}</p>
                    <p>This revolutionary advancement in drone technology represents a significant step forward in autonomous aerial operations. Our engineering team has worked tirelessly to develop solutions that not only meet current market demands but anticipate future needs in the rapidly evolving UAV industry.</p>
                    <p>The implications of this technology extend far beyond traditional applications, opening new possibilities for commercial, industrial, and specialized use cases that were previously unattainable.</p>
                </div>
                
                <div style="
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    padding-top: 1rem;
                    border-top: 1px solid var(--border-secondary);
                ">
                    <button class="cta-button secondary" onclick="this.closest('.article-modal').remove()">
                        Related Articles
                    </button>
                    <button class="SPACECORPZ" onclick="this.closest('.article-modal').remove()">
                        Share Article
                    </button>
                </div>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Close functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = '';
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
                document.body.style.overflow = '';
            }
        });
    }

    initLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.currentPage++;
                this.loadArticles();
            });
        }
    }

    initNewsletterForm() {
        const newsletterForm = document.getElementById('newsletterForm');
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubmit(newsletterForm);
            });
        }
    }

    handleNewsletterSubmit(form) {
        const email = form.querySelector('input[type="email"]').value;
        const button = form.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = 'Subscribed!';
            button.style.background = 'var(--success-color)';
            this.showNotification('Thank you for subscribing to our newsletter!', 'success');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
                form.reset();
            }, 2000);
        }, 1000);
        
        console.log('Newsletter subscription:', email);
    }

    refreshNews() {
        const refreshBtn = document.getElementById('refreshNews');
        const originalText = refreshBtn.textContent;
        
        refreshBtn.textContent = '↻ Refreshing...';
        refreshBtn.disabled = true;
        
        // Simulate API call to fetch latest news
        setTimeout(() => {
            // In a real application, you would fetch from your Django API here
            // For demo, we'll just reload the current articles
            this.currentPage = 1;
            this.loadArticles();
            
            refreshBtn.textContent = '↻ Updated!';
            refreshBtn.style.background = 'var(--success-color)';
            refreshBtn.style.color = 'white';
            
            this.showNotification('News feed updated with latest articles!', 'success');
            
            setTimeout(() => {
                refreshBtn.textContent = originalText;
                refreshBtn.disabled = false;
                refreshBtn.style.background = '';
                refreshBtn.style.color = '';
            }, 2000);
        }, 1500);
    }

    updateResultsInfo() {
        let infoElement = document.getElementById('resultsInfo');
        
        if (!infoElement) {
            infoElement = document.createElement('div');
            infoElement.id = 'resultsInfo';
            infoElement.style.cssText = `
                text-align: center;
                color: var(--text-muted);
                font-size: var(--font-size-sm);
                margin-bottom: var(--spacing-8);
                padding: var(--spacing-4);
            `;
            
            const newsSection = document.querySelector('.news-grid-section .container');
            newsSection.insertBefore(infoElement, newsSection.querySelector('.news-grid'));
        }
        
        const startIndex = (this.currentPage - 1) * this.articlesPerPage;
        const endIndex = Math.min(startIndex + this.articlesPerPage, this.filteredArticles.length);
        
        if (this.searchTerm || this.currentFilter !== 'all') {
            infoElement.textContent = `Showing ${startIndex + 1}-${endIndex} of ${this.filteredArticles.length} articles`;
            infoElement.style.display = 'block';
        } else {
            infoElement.style.display = 'none';
        }
    }

    bindEvents() {
        // Add scroll to top functionality
        this.addScrollToTop();
        
        // Add social sharing
        this.initSocialSharing();
        
        // Add reading progress indicator
        this.addReadingProgress();
    }

    addScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            left: 2rem;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            display: none;
            z-index: 1000;
            transition: all 0.3s ease;
            box-shadow: var(--shadow-lg);
        `;
        
        document.body.appendChild(scrollBtn);
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollBtn.style.display = 'flex';
                scrollBtn.style.alignItems = 'center';
                scrollBtn.style.justifyContent = 'center';
            } else {
                scrollBtn.style.display = 'none';
            }
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    initSocialSharing() {
        // Add share buttons to articles (implement when needed)
        console.log('Social sharing initialized');
    }

    addReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--gradient-primary);
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrolled = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${Math.min(scrolled, 100)}%`;
        });
    }

    // Utility functions
    formatCategory(category) {
        const categories = {
            technology: 'Technology',
            industry: 'Industry News',
            company: 'Company Updates',
            tutorial: 'Tutorials'
        };
        return categories[category] || category;
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const colors = {
            success: 'var(--success-color)',
            error: 'var(--error-color)',
            warning: 'var(--warning-color)',
            info: 'var(--primary-color)'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // API integration methods (for your Django backend)
    async fetchArticlesFromAPI(page = 1, category = 'all', search = '') {
        try {
            const params = new URLSearchParams({
                page,
                category: category !== 'all' ? category : '',
                search
            });
            
            const response = await fetch(`/api/news/?${params}`);
            const data = await response.json();
            
            return {
                articles: data.results,
                hasNext: data.next !== null,
                total: data.count
            };
        } catch (error) {
            console.error('Error fetching articles:', error);
            return { articles: [], hasNext: false, total: 0 };
        }
    }

    async subscribeToNewsletter(email) {
        try {
            const response = await fetch('/api/newsletter/subscribe/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': this.getCSRFToken()
                },
                body: JSON.stringify({ email })
            });
            
            return response.ok;
        } catch (error) {
            console.error('Error subscribing to newsletter:', error);
            return false;
        }
    }

    getCSRFToken() {
        return document.querySelector('[name=csrfmiddlewaretoken]')?.value || '';
    }
}

// Initialize news manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NewsManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NewsManager;
}