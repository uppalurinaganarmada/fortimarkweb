document.addEventListener('DOMContentLoaded', () => {
    
    // Dynamic Heading Text Width Calculation for Chess Coin Sweep Bounds
    function updateTitleWidths() {
        const animatedTitles = document.querySelectorAll('.animated-title');
        animatedTitles.forEach(title => {
            const textNode = title.querySelector('.title-text');
            if (textNode) {
                const originalStyle = textNode.getAttribute('style') || '';
                textNode.style.display = 'inline-block';
                textNode.style.opacity = '1';
                textNode.style.clipPath = 'none';
                
                const width = textNode.getBoundingClientRect().width;
                
                textNode.setAttribute('style', originalStyle);
                title.style.setProperty('--title-width', `${width}px`);
            }
        });
    }

    updateTitleWidths();
    window.addEventListener('resize', updateTitleWidths);

    // 1. Loading Screen Animation Fadeout
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 1200);
    }

    // 1b. Cinematic Logo Text Reveal & Headline Reveal Timeline
    const heroTitle = document.querySelector('.hero-title');
    const logoName = document.getElementById('logo-name');
    
    if (heroTitle) {
        // 1. Reveal the name "FORTIMARK" as the logo zoom is completing (1.5 seconds)
        if (logoName) {
            setTimeout(() => {
                logoName.classList.add('visible');
            }, 1500);
        }

        // 2. Reveal the main headline after the logo text finishes its fade-in (2.5 seconds)
        setTimeout(() => {
            heroTitle.classList.add('title-fade-in');
        }, 2500); 
    }


    // 2. Mobile Menu Navigation Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        const links = navLinks.querySelectorAll('.nav-link, .btn-primary');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 3. Scroll Header styling changes (adjusted for dark theme)
    const header = document.querySelector('.top-bar');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.padding = '0.75rem 2rem';
                header.style.backgroundColor = 'rgba(6, 7, 10, 0.95)';
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.padding = '1.25rem 2rem';
                header.style.backgroundColor = 'rgba(6, 7, 10, 0.75)';
                header.style.boxShadow = 'none';
            }
        });
    }

    // 4. Venn Diagram Interactivity
    const vennCircles = document.querySelectorAll('.venn-circle');
    const detailsPanels = document.querySelectorAll('.details-content');
    let servicesAnimTimeouts = [];

    if (vennCircles.length > 0 && detailsPanels.length > 0) {
        vennCircles.forEach(circle => {
            circle.addEventListener('click', () => {
                // Clear any active automated sequence timeouts
                servicesAnimTimeouts.forEach(t => clearTimeout(t));
                servicesAnimTimeouts = [];
                
                // Clear active intersection highlight
                const intersectionBadge = document.querySelector('.venn-intersection');
                if (intersectionBadge) {
                    intersectionBadge.classList.remove('active-intersection');
                }

                vennCircles.forEach(c => c.classList.remove('active-circle'));
                circle.classList.add('active-circle');

                const targetKey = circle.getAttribute('data-target');

                detailsPanels.forEach(panel => {
                    panel.classList.remove('active');
                });

                const activePanel = document.getElementById(`details-${targetKey}`);
                if (activePanel) {
                    activePanel.classList.add('active');
                }
            });
        });
    }

    // 5. 3D Pop-Out Disney-Style Brand Cards Carousel Interactivity
    const brandsTrack = document.getElementById('brands-track');
    const popCards = document.querySelectorAll('.pop-brand-card');
    const prevBtn = document.getElementById('brand-prev-btn');
    const nextBtn = document.getElementById('brand-next-btn');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let activeBrandIndex = 0;
    let carouselTimer = null;

    function updateCarouselPosition(index) {
        if (popCards.length === 0 || !brandsTrack) return;

        // Wrap index boundaries
        if (index < 0) index = popCards.length - 1;
        if (index >= popCards.length) index = 0;

        activeBrandIndex = index;

        popCards.forEach((card, idx) => {
            if (idx === activeBrandIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        dots.forEach((dot, idx) => {
            if (idx === activeBrandIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Calculate card offset (card width: 240px + gap: 28px = 268px)
        const cardWidth = popCards[0].offsetWidth || 240;
        const gap = 28;
        const offset = activeBrandIndex * (cardWidth + gap);

        brandsTrack.style.transform = `translateX(-${offset}px)`;
    }

    function startAutoCarousel() {
        stopAutoCarousel();
        carouselTimer = setInterval(() => {
            updateCarouselPosition(activeBrandIndex + 1);
        }, 4000);
    }

    function stopAutoCarousel() {
        if (carouselTimer) {
            clearInterval(carouselTimer);
            carouselTimer = null;
        }
    }

    if (brandsTrack && popCards.length > 0) {
        // Prev button click
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                updateCarouselPosition(activeBrandIndex - 1);
                startAutoCarousel();
            });
        }

        // Next button click
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                updateCarouselPosition(activeBrandIndex + 1);
                startAutoCarousel();
            });
        }

        // Dot clicks
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                updateCarouselPosition(idx);
                startAutoCarousel();
            });
        });

        // Direct card clicks
        popCards.forEach((card, idx) => {
            card.addEventListener('click', (e) => {
                // If clicking visit link, allow default navigation
                if (e.target.closest('.pop-visit-btn')) return;
                
                updateCarouselPosition(idx);
                startAutoCarousel();
            });
        });

        // Pause auto-sliding on hover
        const carouselContainer = document.querySelector('.brands-carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoCarousel);
            carouselContainer.addEventListener('mouseleave', startAutoCarousel);
        }

        // Initialize position & timer
        updateCarouselPosition(0);
        startAutoCarousel();
    }

    // 6. Navbar Click Interceptor & Staggered Section Animations
    const navLinksList = document.querySelectorAll('.nav-link');
    
    function animateServicesVenn() {
        // Clear any active timeouts
        servicesAnimTimeouts.forEach(t => clearTimeout(t));
        servicesAnimTimeouts = [];

        const marketingCircle = document.querySelector('.circle-marketing');
        const developmentCircle = document.querySelector('.circle-development');
        const intelligenceCircle = document.querySelector('.circle-intelligence');
        const intersectionBadge = document.querySelector('.venn-intersection');
        const detailsPanel = document.querySelector('.venn-details-panel');
        const intersectionStatement = document.querySelector('.intersection-statement');

        const circles = [marketingCircle, developmentCircle, intelligenceCircle];
        const detailPanels = document.querySelectorAll('.details-content');

        // Reset elements
        circles.forEach(c => {
            if (c) {
                c.classList.remove('animated', 'active-circle');
                c.style.opacity = '0';
            }
        });
        if (detailsPanel) {
            detailsPanel.classList.remove('animated');
            detailsPanel.style.opacity = '0';
        }
        if (intersectionBadge) {
            intersectionBadge.classList.remove('active-intersection');
            intersectionBadge.style.opacity = '0';
        }
        if (intersectionStatement) {
            intersectionStatement.classList.remove('animated');
            intersectionStatement.style.opacity = '0';
        }
        detailPanels.forEach(p => p.classList.remove('active'));

        // Step 1: Reveal first circle with text
        const t1 = setTimeout(() => {
            if (marketingCircle) {
                marketingCircle.style.opacity = '1';
                marketingCircle.classList.add('animated', 'active-circle');
            }
            if (detailsPanel) {
                detailsPanel.style.opacity = '1';
                detailsPanel.classList.add('animated');
            }
            const detailsMarketing = document.getElementById('details-marketing');
            if (detailsMarketing) detailsMarketing.classList.add('active');
        }, 300);
        servicesAnimTimeouts.push(t1);

        // Step 2: Reveal second circle with text (starts immediately after Step 1 transition ends)
        const t2 = setTimeout(() => {
            if (marketingCircle) marketingCircle.classList.remove('active-circle');
            if (developmentCircle) {
                developmentCircle.style.opacity = '1';
                developmentCircle.classList.add('animated', 'active-circle');
            }
            detailPanels.forEach(p => p.classList.remove('active'));
            const detailsDevelopment = document.getElementById('details-development');
            if (detailsDevelopment) detailsDevelopment.classList.add('active');
        }, 1700);
        servicesAnimTimeouts.push(t2);

        // Step 3: Reveal third circle with text (starts immediately after Step 2 transition ends)
        const t3 = setTimeout(() => {
            if (developmentCircle) developmentCircle.classList.remove('active-circle');
            if (intelligenceCircle) {
                intelligenceCircle.style.opacity = '1';
                intelligenceCircle.classList.add('animated', 'active-circle');
            }
            detailPanels.forEach(p => p.classList.remove('active'));
            const detailsIntelligence = document.getElementById('details-intelligence');
            if (detailsIntelligence) detailsIntelligence.classList.add('active');
        }, 3100);
        servicesAnimTimeouts.push(t3);

        // Step 4: Finally, reveal winning zone with highlight (starts immediately after Step 3 transition ends)
        const t4 = setTimeout(() => {
            if (intelligenceCircle) intelligenceCircle.classList.remove('active-circle');
            if (intersectionBadge) {
                intersectionBadge.style.opacity = '1';
                intersectionBadge.classList.add('active-intersection');
            }
            if (intersectionStatement) {
                intersectionStatement.style.opacity = '1';
                intersectionStatement.classList.add('animated');
            }
        }, 4500);
        servicesAnimTimeouts.push(t4);
    }

    function triggerSectionClickAnimation(targetId) {
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;
        
        // Ensure targeted section is visible
        targetSection.classList.add('visible');

        // Update width variables
        updateTitleWidths();

        // Trigger section heading animation
        const animatedTitle = targetSection.querySelector('.animated-title');
        if (animatedTitle) {
            animatedTitle.classList.remove('animate-heading');
            void animatedTitle.offsetWidth; // trigger reflow to reset CSS keyframe animation
            animatedTitle.classList.add('animate-heading');
        }

        // Staggered left-to-right slide for elements in the section (excluding Venn components handled customly)
        const slideElements = Array.from(targetSection.querySelectorAll('.slide-left-to-right'))
            .filter(el => {
                if (targetId === '#services' || targetId === '#how-we-work' || targetId === '#results') {
                    // Let custom timed functions handle Venn components
                    return !el.closest('.venn-wrapper') && !el.closest('.intersection-statement');
                }
                return true;
            });
        
        slideElements.forEach(el => {
            el.classList.remove('animated');
            el.style.opacity = '';
            el.style.transform = '';
            el.style.transition = '';
            void el.offsetWidth; // trigger reflow
        });

        slideElements.forEach((el, idx) => {
            setTimeout(() => {
                el.classList.add('animated');
            }, 100 + idx * 120); // 120ms stagger
        });

        // Trigger custom Venn animation if Services section is accessed
        if (targetId === '#services') {
            animateServicesVenn();
        }
    }

    navLinksList.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    // Smoothly scroll to target with offset to prevent fixed navbar overlap
                    const headerHeight = document.querySelector('.top-bar').offsetHeight || 80;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight - 30;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Active style highlight in navbar links
                    navLinksList.forEach(l => l.style.color = '');
                    link.style.color = 'var(--text-primary)';
                    
                    // Play custom staggered entrance animation
                    triggerSectionClickAnimation(href);
                }
            }
        });
    });

    // 7. Intersection Observer for Scroll Fade-In Animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if ('IntersectionObserver' in window) {
        const fadeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger animations for specific sections when they enter viewport
                    const sectionId = entry.target.id;
                    if (['problem', 'services', 'how-we-work', 'results'].includes(sectionId)) {
                        triggerSectionClickAnimation(`#${sectionId}`);
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
    } else {
        fadeElements.forEach(element => {
            element.classList.add('visible');
        });
    }
});