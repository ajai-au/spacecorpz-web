// Contact form functionality for SPACECORPZ website
class ContactManager {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.initFormValidation();
            this.initFormSubmission();
            this.initFormEnhancements();
        }
        this.initInfoCardAnimations();
        this.initMapInteractions();
    }

    initFormValidation() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
            
            // Enhanced styling
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        const isRequired = field.required;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        field.classList.remove('error');
        this.removeFieldError(field);

        // Required field validation
        if (isRequired && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation
        if (fieldType === 'tel' && value) {
            const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Message length validation
        if (field.name === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.showFieldSuccess(field);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentElement.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.style.cssText = `
                color: var(--error-color);
                font-size: var(--font-size-sm);
                margin-top: var(--spacing-1);
                animation: slideInDown 0.3s ease;
            `;
            field.parentElement.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        field.style.borderColor = 'var(--error-color)';
    }

    showFieldSuccess(field) {
        field.style.borderColor = 'var(--success-color)';
        field.style.boxShadow = '0 0 0 3px rgba(0, 245, 255, 0.1)';
    }

    removeFieldError(field) {
        const errorElement = field.parentElement.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
        field.style.borderColor = '';
        field.style.boxShadow = '';
    }

    initFormSubmission() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleFormSubmit();
        });
    }

    async handleFormSubmit() {
        const formData = new FormData(this.form);
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Validate all fields
        const fields = this.form.querySelectorAll('input[required], select[required], textarea[required]');
        let isFormValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showNotification('Please correct the errors before submitting', 'error');
            return;
        }

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.background = 'var(--text-muted)';

        try {
            // Simulate API call - replace with your actual endpoint
            await this.simulateFormSubmission(formData);
            
            // Success state
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'var(--success-color)';
            
            this.showNotification('Thank you! Your message has been sent successfully.', 'success');
            this.showSuccessAnimation();
            
            // Reset form after delay
            setTimeout(() => {
                this.form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                
                // Clear all field styling
                fields.forEach(field => {
                    field.style.borderColor = '';
                    field.style.boxShadow = '';
                    this.removeFieldError(field);
                });
            }, 3000);

        } catch (error) {
            // Error state
            submitBtn.textContent = 'Failed to Send';
            submitBtn.style.background = 'var(--error-color)';
            
            this.showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }
    }

    async simulateFormSubmission(formData) {
        // Convert FormData to regular object for logging
        const data = Object.fromEntries(formData.entries());
        console.log('Form submission data:', data);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate random success/failure for demo purposes
        if (Math.random() > 0.1) { // 90% success rate
            return Promise.resolve();
        } else {
            return Promise.reject(new Error('Simulated network error'));
        }
    }

    showSuccessAnimation() {
        const successOverlay = document.createElement('div');
        successOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 245, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
            pointer-events: none;
        `;

        const checkmark = document.createElement('div');
        checkmark.innerHTML = '✓';
        checkmark.style.cssText = `
            font-size: 4rem;
            color: var(--success-color);
            background: var(--bg-secondary);
            width: 100px;
            height: 100px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 30px rgba(0, 245, 255, 0.5);
            animation: bounceIn 0.6s ease;
        `;

        successOverlay.appendChild(checkmark);
        document.body.appendChild(successOverlay);

        setTimeout(() => {
            successOverlay.remove();
        }, 2000);

        // Add bounce animation
        if (!document.getElementById('success-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'success-animation-styles';
            style.textContent = `
                @keyframes bounceIn {
                    0% {
                        transform: scale(0) rotate(0deg);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.2) rotate(180deg);
                    }
                    100% {
                        transform: scale(1) rotate(360deg);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initFormEnhancements() {
        // Add character counter for message field
        const messageField = this.form.querySelector('#message');
        if (messageField) {
            this.addCharacterCounter(messageField, 500);
        }

        // Add budget calculator
        this.initBudgetCalculator();

        // Add file upload for project documents (optional)
        this.addFileUpload();

        // Add progress indicator
        this.addProgressIndicator();
    }

    addCharacterCounter(textarea, maxLength) {
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: var(--font-size-sm);
            color: var(--text-muted);
            margin-top: var(--spacing-1);
        `;
        
        textarea.parentElement.appendChild(counter);
        
        const updateCounter = () => {
            const length = textarea.value.length;
            counter.textContent = `${length}/${maxLength}`;
            
            if (length > maxLength * 0.9) {
                counter.style.color = 'var(--warning-color)';
            } else if (length > maxLength) {
                counter.style.color = 'var(--error-color)';
            } else {
                counter.style.color = 'var(--text-muted)';
            }
        };
        
        textarea.addEventListener('input', updateCounter);
        updateCounter();
    }

    initBudgetCalculator() {
        const budgetSelect = this.form.querySelector('#budget');
        if (budgetSelect) {
            budgetSelect.addEventListener('change', (e) => {
                if (e.target.value) {
                    this.showBudgetInfo(e.target.value);
                }
            });
        }
    }

    showBudgetInfo(budgetRange) {
        const budgetInfo = {
            'under-10k': 'Perfect for consumer drones and small commercial projects.',
            '10k-50k': 'Ideal for commercial applications and small fleet deployments.',
            '50k-100k': 'Suitable for large-scale commercial operations and custom solutions.',
            '100k-500k': 'Enterprise-level projects with advanced features and support.',
            'over-500k': 'Large enterprise deployments and custom development projects.'
        };

        const info = budgetInfo[budgetRange];
        if (info) {
            this.showNotification(info, 'info');
        }
    }

    // addFileUpload() {
    //     const fileUploadGroup = document.createElement('div');
    //     fileUploadGroup.className = 'form-group';
    //     fileUploadGroup.innerHTML = `
    //         <label for="files">Project Documents (Optional)</label>
    //         <div class="file-upload-area" style="
    //             border: 2px dashed var(--border-secondary);
    //             border-radius: 8px;
    //             padding: 2rem;
    //             text-align: center;
    //             cursor: pointer;
    //             transition: all 0.3s ease;
    //             background: var(--bg-secondary);
    //         ">
    //             <input type="file" id="files" name="files" multiple 
    //                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" 
    //                    style="display: none;">
    //             <div class="upload-text">
    //                 <div style="font-size: 2rem; margin-bottom: 0.5rem;">📎</div>
    //                 <p>Click to upload files or drag and drop</p>
    //                 <small style="color: var(--text-muted);">PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</small>
    //             </div>
    //             <div class="uploaded-files" style="margin-top: 1rem;"></div>
    //         </div>
    //     `;

    //     // Insert before the submit button
    //     const submitButton = this.form.querySelector('button[type="submit"]');
    //     this.form.insertBefore(fileUploadGroup, submitButton);

    //     const fileInput = fileUploadGroup.querySelector('#files');
    //     const uploadArea = fileUploadGroup.querySelector('.file-upload-area');
    //     const uploadedFiles = fileUploadGroup.querySelector('.uploaded-files');

    //     // Click to upload
    //     uploadArea.addEventListener('click', () => fileInput.click());

    //     // Drag and drop
    //     uploadArea.addEventListener('dragover', (e) => {
    //         e.preventDefault();
    //         uploadArea.style.borderColor = 'var(--primary-color)';
    //         uploadArea.style.background = 'var(--bg-accent)';
    //     });

    //     uploadArea.addEventListener('dragleave', () => {
    //         uploadArea.style.borderColor = 'var(--border-secondary)';
    //         uploadArea.style.background = 'var(--bg-secondary)';
    //     });

    //     uploadArea.addEventListener('drop', (e) => {
    //         e.preventDefault();
    //         uploadArea.style.borderColor = 'var(--border-secondary)';
    //         uploadArea.style.background = 'var(--bg-secondary)';
            
    //         const files = Array.from(e.dataTransfer.files);
    //         this.handleFileUpload(files, uploadedFiles);
    //     });

    //     fileInput.addEventListener('change', (e) => {
    //         const files = Array.from(e.target.files);
    //         this.handleFileUpload(files, uploadedFiles);
    //     });
    // }

    handleFileUpload(files, container) {
        container.innerHTML = '';
        
        files.forEach((file, index) => {
            const fileElement = document.createElement('div');
            fileElement.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: var(--bg-tertiary);
                padding: 0.5rem;
                border-radius: 4px;
                margin-bottom: 0.5rem;
                border: 1px solid var(--border-secondary);
            `;
            
            fileElement.innerHTML = `
                <span style="font-size: var(--font-size-sm);">
                    📄 ${file.name} (${this.formatFileSize(file.size)})
                </span>
                <button type="button" style="
                    background: none;
                    border: none;
                    color: var(--error-color);
                    cursor: pointer;
                    font-size: 1.2rem;
                ">×</button>
            `;
            
            fileElement.querySelector('button').addEventListener('click', () => {
                fileElement.remove();
            });
            
            container.appendChild(fileElement);
        });
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    addProgressIndicator() {
        const progressBar = document.createElement('div');
        progressBar.className = 'form-progress';
        progressBar.style.cssText = `
            height: 3px;
            background: var(--bg-secondary);
            border-radius: 2px;
            margin-bottom: 2rem;
            overflow: hidden;
        `;
        
        const progressFill = document.createElement('div');
        progressFill.style.cssText = `
            height: 100%;
            background: var(--gradient-primary);
            width: 0%;
            transition: width 0.3s ease;
        `;
        
        progressBar.appendChild(progressFill);
        this.form.insertBefore(progressBar, this.form.firstChild);

        // Update progress based on filled fields
        const updateProgress = () => {
            const allFields = this.form.querySelectorAll('input, select, textarea');
            const filledFields = Array.from(allFields).filter(field => {
                if (field.type === 'checkbox') return field.checked;
                return field.value.trim() !== '';
            });
            
            const progress = (filledFields.length / allFields.length) * 100;
            progressFill.style.width = `${Math.min(progress, 100)}%`;
        };

        // Listen to all form changes
        this.form.addEventListener('input', updateProgress);
        this.form.addEventListener('change', updateProgress);
    }

    initInfoCardAnimations() {
        const infoCards = document.querySelectorAll('.info-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('slide-in-right');
                    }, index * 150);
                }
            });
        }, { threshold: 0.2 });

        infoCards.forEach(card => {
            observer.observe(card);
        });
    }

    initMapInteractions() {
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            // Add loading state
            this.addMapLoadingState(mapContainer);
            
            // Add map controls
            this.addMapControls(mapContainer);
        }
    }

    addMapLoadingState(container) {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'map-loading';
        loadingOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--bg-secondary);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            z-index: 1;
        `;
        
        loadingOverlay.innerHTML = `
            <div style="text-align: center; color: var(--text-secondary);">
                <div style="font-size: 2rem; margin-bottom: 1rem;">📍</div>
                <p>Loading map...</p>
            </div>
        `;
        
        container.style.position = 'relative';
        container.appendChild(loadingOverlay);
        
        // Remove loading overlay after iframe loads
        const iframe = container.querySelector('iframe');
        if (iframe) {
            iframe.addEventListener('load', () => {
                setTimeout(() => {
                    loadingOverlay.remove();
                }, 1000);
            });
        }
    }

    addMapControls(container) {
        const controls = document.createElement('div');
        controls.className = 'map-controls';
        controls.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            display: flex;
            gap: 0.5rem;
            z-index: 2;
        `;
        
        const fullscreenBtn = document.createElement('button');
        fullscreenBtn.innerHTML = '⛶';
        fullscreenBtn.style.cssText = `
            background: var(--bg-secondary);
            border: 1px solid var(--border-secondary);
            color: var(--text-primary);
            padding: 0.5rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1.2rem;
            transition: all 0.2s ease;
        `;
        
        fullscreenBtn.addEventListener('click', () => {
            this.openMapFullscreen(container);
        });
        
        controls.appendChild(fullscreenBtn);
        container.appendChild(controls);
    }

    openMapFullscreen(container) {
        const iframe = container.querySelector('iframe');
        const modal = document.createElement('div');
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
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            width: 100%;
            height: 100%;
            max-width: 1200px;
            max-height: 800px;
            position: relative;
            border-radius: 12px;
            overflow: hidden;
        `;
        
        const clonedIframe = iframe.cloneNode(true);
        clonedIframe.style.cssText = 'width: 100%; height: 100%; border: none;';
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(0, 0, 0, 0.7);
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
        `;
        
        closeBtn.addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = '';
        });
        
        modalContent.appendChild(clonedIframe);
        modalContent.appendChild(closeBtn);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = '';
            }
        });
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
        }, 4000);
        
        // Add animation styles if not present
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize contact manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactManager;
}