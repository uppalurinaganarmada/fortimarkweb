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

    // 5. Pinterest-Inspired Interactive Brand Showcase (Smoothies Raisin Style)
    const brandShowcaseData = {
        bologna: {
            title: "Bologna Restaurant",
            subtitle: "Italian Fine Dining & Specialty Kitchen",
            url: "https://slateblue-hedgehog-572890.hostingersite.com",
            logo: "assets/bologna_logo_hd.png",
            waveColor: "linear-gradient(135deg, #1c2841, #0f172a)",
            accentColor: "#1d4ed8",
            titleColor: "#1d4ed8",
            logoStyle: "width: 100%; height: 100%; object-fit: cover; border-radius: 50%;"
        },
        yumm: {
            title: "Yumm Keralam",
            subtitle: "Authentic Kerala Cuisine & Dining",
            url: "https://yummkeralam.com",
            logo: "assets/yumm_logo_hd.png",
            waveColor: "linear-gradient(135deg, #881337, #4c0519)",
            accentColor: "#be123c",
            titleColor: "#be123c",
            logoStyle: "width: 100%; height: 100%; object-fit: cover; border-radius: 50%;"
        },
        dayone: {
            title: "Day One Cafe",
            subtitle: "Artisanal Coffee & Specialty Bistro",
            url: "https://dayonecafe.com",
            logo: "assets/dayone_logo_hd.png",
            waveColor: "linear-gradient(135deg, #2f4a37, #142318)",
            accentColor: "#047857",
            titleColor: "#047857",
            logoStyle: "width: 100%; height: 100%; object-fit: cover; border-radius: 50%;"
        },
        thaichef: {
            title: "Thai Chef",
            subtitle: "Authentic Thai Flavours & Asian Dining",
            url: "https://thaichef.fortimark.co",
            logo: "assets/thaichef_logo_hd.png",
            waveColor: "linear-gradient(135deg, #18181b, #09090b)",
            accentColor: "#b45309",
            titleColor: "#b45309",
            logoStyle: "width: 100%; height: 100%; object-fit: cover; border-radius: 50%;"
        },
        flame: {
            title: "Once Upon a Flame",
            subtitle: "Charcoal & Flame Grill Experience",
            url: "https://instagram.com/once_upon_a_flame",
            logo: "assets/flame_logo_hd.png",
            waveColor: "linear-gradient(135deg, #7c2d12, #451a03)",
            accentColor: "#c2410c",
            titleColor: "#c2410c",
            logoStyle: "width: 100%; height: 100%; object-fit: cover; border-radius: 50%;"
        },
        rajya: {
            title: "Rajya Dvaar",
            subtitle: "Royal Heritage Culinary Experience",
            url: "https://instagram.com/rajya.dvaar",
            logo: "assets/rajya_logo_hd.png",
            waveColor: "linear-gradient(135deg, #581c87, #3b0764)",
            accentColor: "#6d28d9",
            titleColor: "#6d28d9",
            logoStyle: "width: 100%; height: 100%; object-fit: cover; border-radius: 50%;"
        },
        alley: {
            title: "Cafe Down The Alley",
            subtitle: "Cozy Specialty Cafe & Hangout",
            url: "https://instagram.com/cafedownthealley",
            logo: "assets/alley_logo_hd.png",
            waveColor: "linear-gradient(135deg, #0369a1, #075985)",
            accentColor: "#0284c7",
            titleColor: "#0284c7",
            logoStyle: "width: 100%; height: 100%; object-fit: cover; border-radius: 50%;"
        }
    };

    const thumbBtns = document.querySelectorAll('.thumb-btn');
    const showcaseTitle = document.getElementById('showcase-title');
    const showcaseSub = document.getElementById('showcase-sub');
    const showcaseDesc = document.getElementById('showcase-desc');
    const showcaseCta = document.getElementById('showcase-cta');
    const fixedCircleBg = document.getElementById('fixed-circle-bg') || document.getElementById('organic-wave-bg');
    const showcaseLogoImg = document.getElementById('showcase-logo-img');
    const showcaseLogoContainer = document.getElementById('showcase-logo-container');
    
    let showcaseTimer = null;
    let currentBrandKeys = Object.keys(brandShowcaseData);
    let currentShowcaseIdx = 0;

    function switchBrandShowcase(key) {
        const data = brandShowcaseData[key];
        if (!data) return;

        // Active thumb button state
        thumbBtns.forEach(btn => {
            if (btn.getAttribute('data-brand') === key) {
                btn.classList.add('active');
                btn.style.setProperty('--accent', data.titleColor || data.accentColor);
            } else {
                btn.classList.remove('active');
            }
        });

        // Trigger Half Right-Side Rotation Transition (Spin Out)
        if (showcaseLogoContainer) {
            showcaseLogoContainer.classList.remove('half-right-spin-in', 'clock-spin-in', 'clock-spin-out');
            showcaseLogoContainer.classList.add('half-right-spin-out');
        }
        if (fixedCircleBg) {
            fixedCircleBg.classList.remove('right-arc-sweep', 'wave-clock-sweep');
            void fixedCircleBg.offsetWidth; // trigger reflow
            fixedCircleBg.classList.add('right-arc-sweep');
        }

        setTimeout(() => {
            // Update Text Content
            if (showcaseTitle) {
                showcaseTitle.textContent = data.title;
                showcaseTitle.style.color = data.titleColor || data.accentColor;
            }
            if (showcaseSub) {
                showcaseSub.textContent = data.subtitle;
                showcaseSub.style.color = data.titleColor || data.accentColor;
            }
            if (showcaseDesc) showcaseDesc.style.display = 'none';
            if (showcaseCta) {
                showcaseCta.setAttribute('href', data.url);
                showcaseCta.innerHTML = data.url.includes('instagram') ? 'View Instagram &rarr;' : 'Visit Official Website &rarr;';
            }

            // Update Constant Circle Background Color
            if (fixedCircleBg) {
                fixedCircleBg.style.background = data.waveColor;
                fixedCircleBg.style.boxShadow = `0 30px 70px rgba(0, 0, 0, 0.65), 0 0 45px ${data.accentColor}33`;
            }

            // Update Logo Image
            if (showcaseLogoImg) {
                showcaseLogoImg.setAttribute('src', data.logo);
                showcaseLogoImg.setAttribute('alt', `${data.title} Logo`);
                showcaseLogoImg.setAttribute('style', data.logoStyle);
            }

            // Trigger Half Right-Side Rotation Transition (Spin In)
            if (showcaseLogoContainer) {
                showcaseLogoContainer.classList.remove('half-right-spin-out');
                showcaseLogoContainer.classList.add('half-right-spin-in');
            }

            // Clean up animation classes after completion
            setTimeout(() => {
                if (showcaseLogoContainer) showcaseLogoContainer.classList.remove('half-right-spin-in');
                if (fixedCircleBg) fixedCircleBg.classList.remove('right-arc-sweep');
            }, 550);
        }, 260);
    }

    function startAutoShowcase() {
        stopAutoShowcase();
        showcaseTimer = setInterval(() => {
            currentShowcaseIdx = (currentShowcaseIdx + 1) % currentBrandKeys.length;
            switchBrandShowcase(currentBrandKeys[currentShowcaseIdx]);
        }, 4500);
    }

    function stopAutoShowcase() {
        if (showcaseTimer) {
            clearInterval(showcaseTimer);
            showcaseTimer = null;
        }
    }

    if (thumbBtns.length > 0) {
        thumbBtns.forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                currentShowcaseIdx = idx;
                const brandKey = btn.getAttribute('data-brand');
                switchBrandShowcase(brandKey);
                startAutoShowcase();
            });
        });

        const showcaseContainer = document.querySelector('.smoothie-showcase-container');
        if (showcaseContainer) {
            showcaseContainer.addEventListener('mouseenter', stopAutoShowcase);
            showcaseContainer.addEventListener('mouseleave', startAutoShowcase);
        }

        // Initialize with Bologna
        switchBrandShowcase('bologna');
        startAutoShowcase();
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
    // Slide index mapper
    const slideIds = ['#hero', '#services', '#clients', '#problem', '#how-we-work', '#results'];
    const globalWrapper = document.querySelector('.global-slider-wrapper');
    const globalSlides = document.querySelectorAll('.global-slide');
    let currentGlobalIndex = 0;
    let isGlobalTransitioning = false;

    let globalTransitionTimeout = null;
    let transitionDirection = null; // 'next' or 'prev'

    function cancelTransitionTimer() {
        if (globalTransitionTimeout) {
            clearTimeout(globalTransitionTimeout);
            globalTransitionTimeout = null;
            transitionDirection = null;
            console.log("Accidental transition timer cancelled.");
        }
    }

    function goToGlobalSlide(index) {
        console.log("goToGlobalSlide called with index:", index, "isGlobalTransitioning:", isGlobalTransitioning);
        cancelTransitionTimer();
        
        if (index < 0 || index >= slideIds.length || isGlobalTransitioning) {
            console.log("goToGlobalSlide rejected/returned early.");
            return;
        }
        isGlobalTransitioning = true;
        currentGlobalIndex = index;

        try {
            // Slide wrapper calculation
            if (globalWrapper) {
                globalWrapper.style.transform = `translateX(-${index * 100}vw)`;
                console.log("Wrapper transform applied: translateX(-" + (index * 100) + "vw)");
            }

            // Active class handling for fade and scaling transitions
            globalSlides.forEach((slide, idx) => {
                if (idx === index) {
                    slide.classList.add('active-slide');
                    const targetId = slideIds[idx];
                    console.log("Activating slide:", targetId);
                    triggerSectionClickAnimation(targetId);
                } else {
                    slide.classList.remove('active-slide');
                }
            });

            // Update active class on navbar links
            const targetId = slideIds[index];
            navLinksList.forEach(link => {
                const href = link.getAttribute('href');
                if (href === targetId) {
                    link.classList.add('active-link');
                    link.style.color = 'var(--text-primary)';
                } else {
                    link.classList.remove('active-link');
                    link.style.color = '';
                }
            });
        } catch (error) {
            console.error("Error during slide transition:", error);
        } finally {
            setTimeout(() => {
                isGlobalTransitioning = false;
                console.log("isGlobalTransitioning set to false.");
            }, 850); // Matches transition duration in style.css
        }
    }

    // Navbar click Interceptor
    navLinksList.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            console.log("Navbar link clicked:", href);
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetIdx = slideIds.indexOf(href);
                if (targetIdx !== -1) {
                    goToGlobalSlide(targetIdx);
                }
            }
        });
    });

    // Brand logo click to go back to slide 0 (Hero)
    const brandLogoBtn = document.getElementById('logo');
    if (brandLogoBtn) {
        brandLogoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            goToGlobalSlide(0);
        });
    }

    // Elite Throttled Wheel / Scroll event listener with 2s snaper transition on bounds
    let lastGlobalScrollTime = 0;
    window.addEventListener('wheel', (e) => {
        const now = Date.now();
        if (now - lastGlobalScrollTime < 1100) {
            cancelTransitionTimer();
            return;
        }
        
        const activeSlide = document.querySelector('.global-slide.active-slide');
        if (!activeSlide) return;
        
        const remainingScrollBottom = activeSlide.scrollHeight - activeSlide.clientHeight - activeSlide.scrollTop;
        const isAtBottom = remainingScrollBottom < 15;
        const isAtTop = activeSlide.scrollTop < 10;

        if (e.deltaY > 20 && isAtBottom) {
            // User scrolls down at bottom limit
            if (currentGlobalIndex < slideIds.length - 1) {
                if (transitionDirection !== 'next') {
                    cancelTransitionTimer();
                    transitionDirection = 'next';
                    console.log("At bottom. Snapping to next tab in 2s...");
                    globalTransitionTimeout = setTimeout(() => {
                        lastGlobalScrollTime = Date.now();
                        goToGlobalSlide(currentGlobalIndex + 1);
                        cancelTransitionTimer();
                    }, 2000);
                }
            } else {
                cancelTransitionTimer();
            }
        } else if (e.deltaY < -20 && isAtTop) {
            // User scrolls up at top limit
            if (currentGlobalIndex > 0) {
                if (transitionDirection !== 'prev') {
                    cancelTransitionTimer();
                    transitionDirection = 'prev';
                    console.log("At top. Snapping to prev tab in 2s...");
                    globalTransitionTimeout = setTimeout(() => {
                        lastGlobalScrollTime = Date.now();
                        goToGlobalSlide(currentGlobalIndex - 1);
                        cancelTransitionTimer();
                    }, 2000);
                }
            } else {
                cancelTransitionTimer();
            }
        } else {
            // Cancel transition timer if scrolling inside bounds
            cancelTransitionTimer();
        }
    }, { passive: true });

    // Keyboard Arrow Keys support
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'PageDown') {
            if (currentGlobalIndex < slideIds.length - 1) goToGlobalSlide(currentGlobalIndex + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            if (currentGlobalIndex > 0) goToGlobalSlide(currentGlobalIndex - 1);
        }
    });

    // Initialize the slides animations
    goToGlobalSlide(0);
});