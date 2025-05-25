// Web14All Website JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Detect mobile devices for better optimization
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;    
    
    // Add mobile class to body if on mobile device
    if (isMobile) {
        document.body.classList.add('is-mobile');
    }
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Detect if we're on the pricing details page
    const isPricingPage = window.location.href.includes('pricing-details.html');
    
    // Initialize hero animations - will be triggered after loader is gone
    const initHeroAnimations = () => {
        // Animate hero section with slight staggered delay
        gsap.to('#hero-title', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        gsap.to('#hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out'
        });
        
        gsap.to('#hero-cta', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.6,
            ease: 'power3.out'
        });
    };
    
    // Custom block animation loader for main page
    const runBlockAnimation = () => {
        const textBlock = document.querySelector('.text-block');
        const loader = document.getElementById('loader');
        
        if (!textBlock || !loader) return;
        
        // Sequence for block animation
        const runSequence = async () => {
            // Slide in from right
            textBlock.classList.add('slide-in');
            
            // Wait for slide-in to complete
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Bounce effect
            textBlock.classList.add('bounce');
            
            // Wait for bounce to complete
            await new Promise(resolve => setTimeout(resolve, 400));
            
            // Brief pause
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Exit animation
            textBlock.classList.add('exit');
            
            // Wait for exit animation to finish
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Hide loader
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
                
                // Only initialize hero animations after loader is completely gone
                initHeroAnimations();
            }, 100);
        };
        
        // Start the animation sequence
        runSequence();
    };
    
    // Custom pricing animation for pricing details page
    const runPricingAnimation = () => {
        const mainElement = document.querySelector('.pricing-main-element');
        const textLabel = document.querySelector('.pricing-text-label');
        const contentWrapper = document.querySelector('.pricing-content-wrapper');
        const loader = document.getElementById('loader');
        
        if (!mainElement || !textLabel || !contentWrapper || !loader) return;
        
        // Sequence for pricing animation
        const runSequence = async () => {
            // 1. Main content slides in from right
            mainElement.classList.add('slide-in');
            
            // Wait for main content slide-in
            await new Promise(resolve => setTimeout(resolve, 600));
            
            // 2. Main content bounces horizontally
            mainElement.classList.add('bounce-horizontal');
            
            // Wait for main content bounce
            await new Promise(resolve => setTimeout(resolve, 400));
            
            // 3. Text label slides in
            textLabel.classList.add('slide-in');
            
            // Wait for text label slide-in
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // 4. Text label bounces horizontally
            textLabel.classList.add('bounce-horizontal');
            
            // Wait for text label bounce
            await new Promise(resolve => setTimeout(resolve, 400));
            
            // Short pause before combined bounce
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // 5. Combined vertical bounce
            contentWrapper.classList.add('bounce-vertical');
            
            // Wait for vertical bounce
            await new Promise(resolve => setTimeout(resolve, 600));
            
            // Brief pause
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // 6. Exit animation - vertical upwards
            contentWrapper.classList.add('exit-up');
            
            // Wait for exit animation to finish
            await new Promise(resolve => setTimeout(resolve, 700));
            
            // Hide loader
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
                
                // Only initialize hero animations after loader is completely gone
                initHeroAnimations();
            }, 100);
        };
        
        // Start the animation sequence
        runSequence();
    };
    
    // Run the appropriate animation when the page loads
    if (isPricingPage) {
        runPricingAnimation();
    } else {
        runBlockAnimation();
    }
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    
    // Check for saved theme preference or respect OS preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
        document.documentElement.classList.add('dark');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
    
    // Handle theme toggle click
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        
        if (document.documentElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        } else {
            localStorage.setItem('theme', 'light');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
    });
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Optimized scroll reveal animation with Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-element');
    
    // Use Intersection Observer for better performance than scroll events
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                // Set delay if specified (shorter delays on mobile)
                if (element.dataset.delay) {
                    const delay = isMobile ? parseFloat(element.dataset.delay) * 0.5 : element.dataset.delay;
                    element.style.setProperty('--delay', delay);
                }
                element.classList.add('active');
                // Stop observing once revealed
                revealObserver.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Start observing all reveal elements
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Optimized GSAP animations with mobile awareness
    const createScrollTriggers = (selector, staggerDelay = 0.1) => {
        const elements = gsap.utils.toArray(selector);
        elements.forEach((element, i) => {
            // Reduce animation complexity on mobile
            const duration = isMobile ? 0.4 : 0.6;
            const delay = isMobile ? i * 0.05 : i * staggerDelay;
            
            ScrollTrigger.create({
                trigger: element,
                start: 'top bottom-=80',
                onEnter: () => {
                    // Use simpler animations on mobile for better performance
                    gsap.to(element, {
                        y: 0,
                        opacity: 1,
                        duration: duration,
                        delay: delay,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                },
                once: true
            });
        });
    };
    
    // Apply the same animation pattern to different card types
    createScrollTriggers('.service-card');
    createScrollTriggers('.example-card');
    createScrollTriggers('.why-card');
    createScrollTriggers('.pricing-card');
    
    // Additional mobile optimizations for pricing table
    if (isMobile) {
        // Add swipe hint for tables that might need horizontal scrolling
        const tables = document.querySelectorAll('table');
        tables.forEach(table => {
            if (table.scrollWidth > table.clientWidth) {
                const container = table.closest('.overflow-x-auto');
                if (container) {
                    container.classList.add('pricing-table-container');
                    // Add a swipe hint element
                    const swipeHint = document.createElement('div');
                    swipeHint.classList.add('swipe-hint');
                    swipeHint.innerHTML = '<i class="fas fa-arrows-left-right"></i> Swipe for more';
                    container.insertAdjacentElement('beforebegin', swipeHint);
                }
            }
        });
    }
    
    // Enhanced form validation with better mobile UX
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        // Add form input enhancement for mobile
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            // Better mobile input handling
            input.addEventListener('focus', () => {
                // Add a class to the parent to style the focused state better
                input.parentElement.classList.add('input-focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('input-focused');
            });
        });
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredInputs = contactForm.querySelectorAll('input[required], textarea[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    // Add error message if it doesn't exist
                    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                        const errorMessage = document.createElement('div');
                        errorMessage.classList.add('error-message', 'text-red-500', 'text-xs', 'mt-1');
                        errorMessage.textContent = 'Dette felt er påkrævet';
                        input.insertAdjacentElement('afterend', errorMessage);
                    }
                } else {
                    input.classList.remove('error');
                    // Remove error message if it exists
                    if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                        input.nextElementSibling.remove();
                    }
                }
            });
            
            if (isValid) {
                // Here you would add actual form submission logic
                
                // For demonstration, show success message
                // Replace alert with a nicer toast notification
                const successToast = document.createElement('div');
                successToast.classList.add('fixed', 'bottom-4', 'left-1/2', 'transform', '-translate-x-1/2', 
                    'bg-green-600', 'text-white', 'px-6', 'py-3', 'rounded-full', 'shadow-lg', 'z-50');
                successToast.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Tak for din besked! Vi vender tilbage hurtigst muligt.';
                document.body.appendChild(successToast);
                
                // Remove the toast after 5 seconds
                setTimeout(() => {
                    successToast.classList.add('opacity-0', 'transition-opacity', 'duration-500');
                    setTimeout(() => successToast.remove(), 500);
                }, 5000);
                
                contactForm.reset();
            }
        });
    }
    
    // Handle pricing-details.html page mobile experience
    if (window.location.pathname.includes('pricing-details.html')) {
        // Only apply if on mobile
        if (isMobile) {
            // Swipe hint functionality removed
            
            // Handle scroll indicator for Apple-style scrolling
            const scrollWrapper = document.querySelector('.pricing-table-scroll-wrapper');
            const scrollIndicator = document.querySelector('.scroll-indicator-progress');
            const scrollContainer = document.querySelector('.scroll-indicator-container');
            
            if (scrollWrapper && scrollIndicator && scrollContainer) {
                // Show scroll indicator
                scrollContainer.classList.remove('hidden');
                
                // Calculate and update scroll indicator position
                const updateScrollIndicator = () => {
                    const tableWidth = scrollWrapper.scrollWidth;
                    const visibleWidth = scrollWrapper.clientWidth;
                    const maxScroll = tableWidth - visibleWidth;
                    const currentScroll = scrollWrapper.scrollLeft;
                    
                    // Avoid division by zero
                    if (maxScroll <= 0) return;
                    
                    // Calculate position percentage with full range (0-1)
                    const scrollPercentage = Math.min(currentScroll / maxScroll, 1.0);
                    
                    // Get the container and indicator widths
                    const indicatorWidth = scrollIndicator.offsetWidth;
                    const containerWidth = scrollContainer.offsetWidth;
                    
                    // Calculate maximum translation (ensures it reaches the end)
                    const maxTranslation = containerWidth - indicatorWidth;
                    
                    // Update indicator position to accurately reflect scroll position
                    // This ensures it goes from leftmost (0%) to rightmost (100%) position
                    scrollIndicator.style.transform = `translateX(${scrollPercentage * maxTranslation}px)`;
                };
                
                // Attach scroll event listener
                scrollWrapper.addEventListener('scroll', updateScrollIndicator, { passive: true });
                
                // Initial update
                updateScrollIndicator();
                
                // Fix for iOS Safari bounce scroll issues
                scrollWrapper.addEventListener('touchmove', (e) => {
                    // Prevent scrolling the entire body if we're at the limits
                    if ((scrollWrapper.scrollLeft === 0 && e.touches[0].clientX > 50) || 
                        (scrollWrapper.scrollLeft >= scrollWrapper.scrollWidth - scrollWrapper.clientWidth - 5 && 
                         e.touches[0].clientX < 50)) {
                        e.preventDefault();
                    }
                }, { passive: false });
            }
        }
    }
    
    // Apple-style pricing cards scroll behavior
    const initPricingScroll = () => {
        // Only initialize on mobile
        if (!isMobile) return;
        
        const scrollWrapper = document.querySelector('.pricing-scroll-wrapper');
        const scrollIndicator = document.querySelector('.scroll-indicator-progress');
        const swipeHint = document.querySelector('.swipe-hint-container');
        
        if (!scrollWrapper || !scrollIndicator) return;
        
        // Show swipe hint initially
        if (swipeHint) {
            swipeHint.classList.remove('hidden');
            // Hide it after animation completes (5 seconds)
            setTimeout(() => {
                swipeHint.classList.add('hidden');
            }, 5000);
        }
        
        // Calculate scroll position and update indicator
        const updateScrollIndicator = () => {
            const scrollWidth = scrollWrapper.scrollWidth - scrollWrapper.clientWidth;
            const scrollPosition = scrollWrapper.scrollLeft;
            const scrollPercentage = Math.min(scrollPosition / scrollWidth, 1);
            
            // Number of cards
            const cardCount = scrollWrapper.querySelectorAll('.pricing-card').length;
            
            // Calculate indicator position
            if (cardCount > 0) {
                // Move the indicator based on scroll position
                scrollIndicator.style.transform = `translateX(${scrollPercentage * (100 - (100 / cardCount))}%)`;
            }
        };
        
        // Listen for scroll events
        scrollWrapper.addEventListener('scroll', () => {
            updateScrollIndicator();
            
            // Show scroll indicator container when user starts scrolling
            document.querySelector('.scroll-indicator-container').classList.remove('hidden');
        });
        
        // Initial update
        updateScrollIndicator();
    };
    
    // Initialize pricing scroll on page load
    initPricingScroll();
});
