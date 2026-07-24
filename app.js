document.addEventListener('DOMContentLoaded', () => {
    let servicesAnimTimeouts = [];
    let servicesTourTimeouts = [];
    
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

    // 1. Morphing Intro Loader Animation Sequence
    const loader = document.getElementById('loader');
    const introLogoIcon = document.getElementById('intro-logo-icon');
    const introLogoText = document.getElementById('intro-logo-text');
    const introLogoGroup = document.getElementById('intro-logo-group');
    const targetNavLogo = document.getElementById('logo');
    const heroTitle = document.querySelector('.hero-title');
    const logoName = document.getElementById('logo-name');

    if (loader && introLogoIcon && introLogoText && introLogoGroup && targetNavLogo) {
        // Step 1: Reveal logo icon (100ms)
        setTimeout(() => {
            introLogoIcon.classList.add('reveal');
        }, 100);

        // Step 2: Reveal logo text "FORTIMARK" (1000ms)
        setTimeout(() => {
            introLogoText.classList.add('reveal');
        }, 1000);

        // Step 3: Morph transition to top header navigation logo (2400ms)
        setTimeout(() => {
            const targetRect = targetNavLogo.getBoundingClientRect();
            const groupRect = introLogoGroup.getBoundingClientRect();

            // Calculate scale and delta coordinates based on top-left origin alignment
            const scaleFactor = targetRect.height / groupRect.height;
            const dx = targetRect.left - groupRect.left;
            const dy = targetRect.top - groupRect.top;

            introLogoGroup.style.transformOrigin = 'top left';
            introLogoGroup.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${scaleFactor})`;
        }, 2400);

        // Step 4: Hide loader, show actual nav logo and start hero content reveal (3600ms)
        setTimeout(() => {
            // Show the actual navigation logo
            targetNavLogo.classList.add('reveal');
            
            // Fade out the loader screen overlay and intro group
            loader.style.opacity = '0';
            loader.style.pointerEvents = 'none';
            introLogoGroup.style.opacity = '0';

            // Start hero animations
            if (logoName) {
                logoName.classList.add('visible');
            }
            if (heroTitle) {
                heroTitle.classList.add('title-fade-in');
            }

            // Cleanup loader element after transition completes
            setTimeout(() => {
                loader.style.display = 'none';
            }, 900);
        }, 3600);
    } else {
        // Fallback if elements don't exist
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
            }, 1200);
        }
        if (heroTitle) {
            setTimeout(() => {
                if (logoName) logoName.classList.add('visible');
                heroTitle.classList.add('title-fade-in');
            }, 2000);
        }
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

    // 4. 3D Pop-Up Chessboard Interactivity & Full-Screen Modal
    const chessSquares = document.querySelectorAll('.chess-board-square');
    const detailsPanels = document.querySelectorAll('.details-content');

    if (chessSquares.length > 0 && detailsPanels.length > 0) {
        chessSquares.forEach(square => {
            square.addEventListener('click', () => {
                // Cancel the automated guided tour sequence timeouts
                servicesTourTimeouts.forEach(t => clearTimeout(t));
                servicesTourTimeouts = [];

                // Remove active classes
                chessSquares.forEach(s => s.classList.remove('active'));
                detailsPanels.forEach(panel => panel.classList.remove('active'));

                // Add active class to clicked square
                square.classList.add('active');

                // Activate corresponding details panel
                const targetKey = square.getAttribute('data-target');
                const activePanel = document.getElementById(`details-${targetKey}`);
                if (activePanel) {
                    activePanel.classList.add('active');
                }

                // POP OPEN THE FULL SCREEN BLURRED MODAL
                const servicesModal = document.getElementById('services-modal');
                if (servicesModal) {
                    const modalTitle = document.getElementById('modal-service-title');
                    const modalSubtitle = document.getElementById('modal-service-subtitle');
                    const modalTags = document.getElementById('modal-tags-container');
                    const modalGlassCoin = document.getElementById('modal-glass-coin');

                    if (activePanel) {
                        const h3 = activePanel.querySelector('h3');
                        const sub = activePanel.querySelector('.details-sub');
                        const tags = Array.from(activePanel.querySelectorAll('.details-tags span')).map(s => s.textContent);

                        if (modalTitle) modalTitle.textContent = h3 ? h3.textContent : '';
                        if (modalSubtitle) modalSubtitle.textContent = sub ? sub.textContent : '';
                        
                        if (modalTags) {
                            modalTags.innerHTML = '';
                            tags.forEach(tagText => {
                                const span = document.createElement('span');
                                span.textContent = tagText;
                                modalTags.appendChild(span);
                            });
                        }
                    }

                    if (modalGlassCoin) {
                        const originalSvg = square.querySelector('.glass-chess-piece svg');
                        if (originalSvg) {
                            modalGlassCoin.innerHTML = originalSvg.outerHTML;
                        }
                    }

                    // Activate modal
                    servicesModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Lock background scroll
                }
            });
        });
    }

    // Close modal handlers
    const servicesModalObj = document.getElementById('services-modal');
    const modalCloseBtn = document.getElementById('services-modal-close');
    if (servicesModalObj && modalCloseBtn) {
        const closeModal = () => {
            servicesModalObj.classList.remove('active');
            document.body.style.overflow = '';
        };

        modalCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });

        servicesModalObj.addEventListener('click', (e) => {
            if (e.target === servicesModalObj) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && servicesModalObj.classList.contains('active')) {
                closeModal();
            }
        });
    }

    const brandShowcaseData = {
        bologna: {
            title: "Bologna Restaurant",
            subtitle: "Italian Fine Dining & Specialty Kitchen",
            url: "https://slateblue-hedgehog-572890.hostingersite.com",
            logo: "assets/bologna_logo_hd.png",
            waveColor: "linear-gradient(135deg, #1c2841, #0f172a)",
            accentColor: "#1d4ed8",
            titleColor: "#1d4ed8",
            logoStyle: "width: 100%; height: 100%; object-fit: cover;"
        },
        yumm: {
            title: "Yumm Keralam",
            subtitle: "Authentic Kerala Cuisine & Dining",
            url: "https://yummkeralam.com",
            logo: "assets/yumm_logo_hd.png",
            waveColor: "linear-gradient(135deg, #881337, #4c0519)",
            accentColor: "#be123c",
            titleColor: "#be123c",
            logoStyle: "width: 100%; height: 100%; object-fit: cover;"
        },
        dayone: {
            title: "Day One Cafe",
            subtitle: "Artisanal Coffee & Specialty Bistro",
            url: "https://dayonecafe.com",
            logo: "assets/dayone_logo_hd.png",
            waveColor: "linear-gradient(135deg, #2f4a37, #142318)",
            accentColor: "#047857",
            titleColor: "#047857",
            logoStyle: "width: 100%; height: 100%; object-fit: cover;"
        },
        thaichef: {
            title: "Thai Chef",
            subtitle: "Authentic Thai Flavours & Asian Dining",
            url: "https://thaichef.fortimark.co",
            logo: "assets/thaichef_logo_hd.png",
            waveColor: "linear-gradient(135deg, #18181b, #09090b)",
            accentColor: "#b45309",
            titleColor: "#b45309",
            logoStyle: "width: 100%; height: 100%; object-fit: cover;"
        },
        flame: {
            title: "Once Upon a Flame",
            subtitle: "Charcoal & Flame Grill Experience",
            url: "https://instagram.com/once_upon_a_flame",
            logo: "assets/flame_logo_hd.png",
            waveColor: "linear-gradient(135deg, #7c2d12, #451a03)",
            accentColor: "#c2410c",
            titleColor: "#c2410c",
            logoStyle: "width: 100%; height: 100%; object-fit: cover;"
        },
        rajya: {
            title: "Rajya Dvaar",
            subtitle: "Royal Heritage Culinary Experience",
            url: "https://instagram.com/rajya.dvaar",
            logo: "assets/rajya_logo_hd.png",
            waveColor: "linear-gradient(135deg, #581c87, #3b0764)",
            accentColor: "#6d28d9",
            titleColor: "#6d28d9",
            logoStyle: "width: 100%; height: 100%; object-fit: cover;"
        },
        alley: {
            title: "Cafe Down The Alley",
            subtitle: "Cozy Specialty Cafe & Hangout",
            url: "https://instagram.com/cafedownthealley",
            logo: "assets/alley_logo_hd.png",
            waveColor: "linear-gradient(135deg, #0369a1, #075985)",
            accentColor: "#0284c7",
            titleColor: "#0284c7",
            logoStyle: "width: 100%; height: 100%; object-fit: cover;"
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
    
    function animateServicesChessboard() {
        // Clear any active timeouts
        servicesAnimTimeouts.forEach(t => clearTimeout(t));
        servicesAnimTimeouts = [];
        servicesTourTimeouts.forEach(t => clearTimeout(t));
        servicesTourTimeouts = [];

        const chessSquares = document.querySelectorAll('.chess-board-square');
        const detailsPanels = document.querySelectorAll('.details-content');
        const detailsPanel = document.querySelector('.venn-details-panel');
        const intersectionStatement = document.querySelector('.intersection-statement');
        const perspectiveContainer = document.querySelector('.services-perspective-container');

        // Reset elements
        chessSquares.forEach(s => {
            s.classList.remove('active', 'animated');
            s.style.opacity = '0';
            s.style.transform = 'translateZ(-60px) scale(0.8)';
        });
        detailsPanels.forEach(p => p.classList.remove('active'));
        if (detailsPanel) {
            detailsPanel.classList.remove('animated');
            detailsPanel.style.opacity = '0';
            detailsPanel.style.transform = 'translate3d(20px, 0, 0)';
            detailsPanel.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
        }
        if (intersectionStatement) {
            intersectionStatement.classList.remove('animated');
            intersectionStatement.style.opacity = '0';
        }
        if (perspectiveContainer) {
            perspectiveContainer.style.opacity = '0';
            perspectiveContainer.style.transform = 'translate3d(-20px, 0, 0)';
            perspectiveContainer.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
        }

        // Fade in container immediately
        setTimeout(() => {
            if (perspectiveContainer) {
                perspectiveContainer.style.opacity = '1';
                perspectiveContainer.style.transform = 'translate3d(0, 0, 0)';
            }
        }, 50);

        // Staggered chessboard squares popup
        chessSquares.forEach((square, idx) => {
            const t = setTimeout(() => {
                square.style.opacity = '1';
                square.style.transform = ''; // reset to default CSS transform (flat/tilted)
                square.classList.add('animated');
            }, 100 + idx * 180);
            servicesAnimTimeouts.push(t);
        });

        // Reveal details panel
        const tPanel = setTimeout(() => {
            if (detailsPanel) {
                detailsPanel.style.opacity = '1';
                detailsPanel.style.transform = 'translate3d(0, 0, 0)';
                detailsPanel.classList.add('animated');
            }
            if (intersectionStatement) {
                intersectionStatement.style.opacity = '1';
                intersectionStatement.classList.add('animated');
            }
        }, 1100);
        servicesAnimTimeouts.push(tPanel);

        // Guided Tour sequence: pop glass coins out one by one, showing info in the cards beside them
        chessSquares.forEach((square, idx) => {
            const tTour = setTimeout(() => {
                // Remove active classes
                chessSquares.forEach(s => s.classList.remove('active'));
                detailsPanels.forEach(p => p.classList.remove('active'));

                // Highlight current square and its detail card
                square.classList.add('active');
                const targetKey = square.getAttribute('data-target');
                const activePanel = document.getElementById(`details-${targetKey}`);
                if (activePanel) {
                    activePanel.classList.add('active');
                }
            }, 1300 + idx * 2500); // 2.5 seconds per service highlight
            servicesTourTimeouts.push(tTour);
        });

        // Settle back on the first capability at the end of the sequence
        const tLoop = setTimeout(() => {
            chessSquares.forEach(s => s.classList.remove('active'));
            detailsPanels.forEach(p => p.classList.remove('active'));

            if (chessSquares[0]) chessSquares[0].classList.add('active');
            const detailsDigital = document.getElementById('details-digital-presence');
            if (detailsDigital) detailsDigital.classList.add('active');
        }, 1300 + chessSquares.length * 2500);
        servicesTourTimeouts.push(tLoop);
    }

    function triggerSectionClickAnimation(targetId) {
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;
        
        // Ensure targeted section is visible
        targetSection.classList.add('visible');
        targetSection.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });

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

        // Trigger custom Chessboard animation if Services section is accessed
        if (targetId === '#services') {
            animateServicesChessboard();
        }
    }
    // Slide index mapper
    const slideIds = ['#hero', '#services', '#clients', '#problem', '#how-we-work', '#results'];
    const globalWrapper = document.querySelector('.global-slider-wrapper');
    const globalSlides = document.querySelectorAll('.global-slide');
    let currentGlobalIndex = 0;
    let isGlobalTransitioning = false;
    let lastGlobalScrollTime = 0;

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
        lastGlobalScrollTime = Date.now();

        try {
            // Slide wrapper calculation
            if (globalWrapper) {
                globalWrapper.style.transform = `translateY(-${index * 100}vh)`;
                console.log("Wrapper transform applied: translateY(-" + (index * 100) + "vh)");
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
                    slide.querySelectorAll('.fade-in').forEach(el => el.classList.remove('visible'));
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

        if (e.deltaY > 2 && isAtBottom) {
            // User scrolls down at bottom limit
            if (currentGlobalIndex < slideIds.length - 1) {
                if (transitionDirection !== 'next') {
                    cancelTransitionTimer();
                    transitionDirection = 'next';
                    console.log("At bottom. Snapping to next tab in 1s...");
                    globalTransitionTimeout = setTimeout(() => {
                        lastGlobalScrollTime = Date.now();
                        goToGlobalSlide(currentGlobalIndex + 1);
                        cancelTransitionTimer();
                    }, 1000);
                }
            }
        } else if (e.deltaY < -2 && isAtTop) {
            // User scrolls up at top limit
            if (currentGlobalIndex > 0) {
                if (transitionDirection !== 'prev') {
                    cancelTransitionTimer();
                    transitionDirection = 'prev';
                    console.log("At top. Snapping to prev tab in 1s...");
                    globalTransitionTimeout = setTimeout(() => {
                        lastGlobalScrollTime = Date.now();
                        goToGlobalSlide(currentGlobalIndex - 1);
                        cancelTransitionTimer();
                    }, 1000);
                }
            }
        } else {
            // Cancel transition timer ONLY if user reverses direction or scroll is mid-content
            if (transitionDirection === 'next' && (e.deltaY < -2 || !isAtBottom)) {
                cancelTransitionTimer();
            } else if (transitionDirection === 'prev' && (e.deltaY > 2 || !isAtTop)) {
                cancelTransitionTimer();
            }
        }
    }, { passive: true });

    // Touch Swipe Support for mobile phone scrolling/swiping
    let touchStartY = 0;
    let touchStartX = 0;
    
    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
        if (isGlobalTransitioning) return;
        
        const now = Date.now();
        if (now - lastGlobalScrollTime < 1100) {
            return;
        }

        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;

        const diffY = touchEndY - touchStartY;
        const diffX = touchEndX - touchStartX;

        // Check if vertical swipe is dominant
        if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 40) {
            // Ignore swipe inside scrollable modal
            if (e.target.closest('.services-modal-container') || e.target.closest('.services-modal-overlay')) {
                return;
            }

            const activeSlide = document.querySelector('.global-slide.active-slide');
            if (!activeSlide) return;

            const remainingScrollBottom = activeSlide.scrollHeight - activeSlide.clientHeight - activeSlide.scrollTop;
            const isAtBottom = remainingScrollBottom < 15;
            const isAtTop = activeSlide.scrollTop < 10;

            if (diffY < 0 && isAtBottom) {
                // Swipe Up -> scroll down -> go to next slide
                if (currentGlobalIndex < slideIds.length - 1) {
                    goToGlobalSlide(currentGlobalIndex + 1);
                }
            } else if (diffY > 0 && isAtTop) {
                // Swipe Down -> scroll up -> go to previous slide
                if (currentGlobalIndex > 0) {
                    goToGlobalSlide(currentGlobalIndex - 1);
                }
            }
        } else if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            // Horizontal Swiping support
            if (e.target.closest('.services-modal-container') || e.target.closest('.services-modal-overlay') || e.target.closest('.coverflow-container')) {
                return; // Let modal/coverflow swipe normally
            }
            if (diffX < 0) {
                // Swipe Left -> next
                if (currentGlobalIndex < slideIds.length - 1) {
                    goToGlobalSlide(currentGlobalIndex + 1);
                }
            } else if (diffX > 0) {
                // Swipe Right -> prev
                if (currentGlobalIndex > 0) {
                    goToGlobalSlide(currentGlobalIndex - 1);
                }
            }
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

    // Pinterest-Style Problem Transition Slider Handler
    const probTrack = document.getElementById('problem-illustrations-track');
    const probItems = document.querySelectorAll('.illustration-slide-item');
    const probDotsContainer = document.getElementById('problem-slider-dots');
    const probSlideIndex = document.getElementById('problem-slide-index');
    const probSlideTitle = document.getElementById('problem-slide-title');
    const probSlideDesc = document.getElementById('problem-slide-desc');

    const problemData = [
        {
            index: "01 / 04",
            title: "Content vs Visibility",
            desc: "Some have exceptional content but weak visibility."
        },
        {
            index: "02 / 04",
            title: "Search vs Story",
            desc: "Some rank well online but fail to tell a compelling story."
        },
        {
            index: "03 / 04",
            title: "Ads vs Retention",
            desc: "Some spend heavily on advertising but lack retention systems."
        },
        {
            index: "04 / 04",
            title: "CX vs Tech",
            desc: "Some have incredible customer experiences but outdated digital infrastructure."
        }
    ];

    let currentProbIdx = 0;
    let probAutoplayInterval = null;

    function updateProblemSlider(index) {
        if (index < 0 || index >= problemData.length) return;
        currentProbIdx = index;

        // Update active class on illustration items
        probItems.forEach((item, idx) => {
            if (idx === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update pagination dots active state
        if (probDotsContainer) {
            const dots = probDotsContainer.querySelectorAll('.prob-dot');
            dots.forEach((dot, idx) => {
                if (idx === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // Calculate translation offset to center the active item
        const activeItem = probItems[index];
        if (activeItem && probTrack) {
            const wrapper = probTrack.parentElement;
            if (wrapper) {
                const wrapperWidth = wrapper.offsetWidth;
                const itemCenter = activeItem.offsetLeft + activeItem.offsetWidth / 2;
                const offset = wrapperWidth / 2 - itemCenter;
                probTrack.style.transform = `translate3d(${offset}px, -50%, 0)`;
                console.log(`Problem slider shifted: index ${index}, offset ${offset}px`);
            }
        }

        // Fade out text, update content, and fade back in
        const infoBox = document.querySelector('.problem-slider-info-box');
        if (infoBox && probSlideIndex && probSlideTitle && probSlideDesc) {
            infoBox.style.opacity = 0;
            infoBox.style.transform = 'translate3d(-20px, 0, 0)';
            setTimeout(() => {
                probSlideIndex.textContent = problemData[index].index;
                probSlideTitle.textContent = problemData[index].title;
                probSlideDesc.textContent = problemData[index].desc;
                infoBox.style.opacity = 1;
                infoBox.style.transform = 'translate3d(0, 0, 0)';
            }, 250);
        }
    }

    function startProbAutoplay() {
        stopProbAutoplay();
        probAutoplayInterval = setInterval(() => {
            let nextIdx = currentProbIdx + 1;
            if (nextIdx >= problemData.length) {
                nextIdx = 0; // Loop back
            }
            updateProblemSlider(nextIdx);
        }, 4000); // Cycle every 4s
    }

    function stopProbAutoplay() {
        if (probAutoplayInterval) {
            clearInterval(probAutoplayInterval);
            probAutoplayInterval = null;
        }
    }

    // Connect pagination dots listeners
    if (probDotsContainer) {
        const dots = probDotsContainer.querySelectorAll('.prob-dot');
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                updateProblemSlider(idx);
                // Pause autoplay on user interaction for 8 seconds before resuming
                stopProbAutoplay();
                setTimeout(startProbAutoplay, 8000);
            });
        });

        // Allow tapping directly on the slide items to jump to them
        probItems.forEach((item, idx) => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                updateProblemSlider(idx);
                stopProbAutoplay();
                setTimeout(startProbAutoplay, 8000);
            });
        });

        // Initialize on load and resize
        window.addEventListener('resize', () => {
            updateProblemSlider(currentProbIdx);
        });
        
        // Wait briefly for layout render to get accurate offsets
        setTimeout(() => {
            updateProblemSlider(0);
            startProbAutoplay();
        }, 150);
    }

    // 3D Cover Flow Process Slider Handler
    const cfTrack = document.getElementById('process-coverflow-track');
    const cfCards = document.querySelectorAll('.coverflow-card');
    const cfDotsContainer = document.getElementById('process-coverflow-dots');
    
    let currentCfIdx = 0;
    let cfAutoplayInterval = null;

    function updateCoverflow(centerIndex) {
        if (centerIndex < 0 || centerIndex >= cfCards.length) return;
        currentCfIdx = centerIndex;

        const isMobile = window.innerWidth < 768;
        const xOffset = isMobile ? 65 : 95;            // Tighter horizontal step spacing
        const centerSpread = isMobile ? 25 : 45;       // Keeps background cards tucked closely behind center
        const zOffset = isMobile ? 70 : 110;           // Deeper perspective offset
        const rotationAngle = isMobile ? 45 : 60;      // Sharper 3D folding rotation

        cfCards.forEach((card, idx) => {
            const diff = idx - centerIndex;
            
            if (diff === 0) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }

            let tx = 0;
            let ty = 0;
            let tz = 0;
            let ry = 0;
            let scale = 1;
            let opacity = 1;
            let blur = 0;
            let zIndex = 10 - Math.abs(diff);

            if (diff === 0) {
                tx = 0;
                tz = 60; // Pull active card slightly more forward
                ry = 0;
                scale = 1.05;
                opacity = 1;
                blur = 0;
            } else if (diff < 0) {
                tx = diff * xOffset - centerSpread;
                tz = -Math.abs(diff) * zOffset;
                ry = rotationAngle;
                scale = 0.85;
                opacity = Math.max(0.15, 0.65 - Math.abs(diff) * 0.15); // Fade background cards a bit more
                blur = Math.min(5, Math.abs(diff) * 1.5);
            } else {
                tx = diff * xOffset + centerSpread;
                tz = -Math.abs(diff) * zOffset;
                ry = -rotationAngle;
                scale = 0.85;
                opacity = Math.max(0.15, 0.65 - Math.abs(diff) * 0.15);
                blur = Math.min(5, Math.abs(diff) * 1.5);
            }

            card.style.transform = `translate3d(${tx}px, ${ty}px, ${tz}px) rotateY(${ry}deg) scale(${scale})`;
            card.style.opacity = opacity;
            card.style.filter = blur > 0 ? `blur(${blur}px)` : 'none';
            card.style.zIndex = zIndex;
        });

        if (cfDotsContainer) {
            const dots = cfDotsContainer.querySelectorAll('.cf-dot');
            dots.forEach((dot, idx) => {
                if (idx === centerIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }

    function startCfAutoplay() {
        stopCfAutoplay();
        cfAutoplayInterval = setInterval(() => {
            let nextIdx = currentCfIdx + 1;
            if (nextIdx >= cfCards.length) nextIdx = 0;
            updateCoverflow(nextIdx);
        }, 5000);
    }

    function stopCfAutoplay() {
        if (cfAutoplayInterval) {
            clearInterval(cfAutoplayInterval);
            cfAutoplayInterval = null;
        }
    }

    if (cfCards.length && cfTrack) {
        if (cfDotsContainer) {
            const dots = cfDotsContainer.querySelectorAll('.cf-dot');
            dots.forEach((dot, idx) => {
                dot.addEventListener('click', (e) => {
                    e.stopPropagation();
                    updateCoverflow(idx);
                    stopCfAutoplay();
                    setTimeout(startCfAutoplay, 10000);
                });
            });
        }

        cfCards.forEach((card, idx) => {
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                updateCoverflow(idx);
                stopCfAutoplay();
                setTimeout(startCfAutoplay, 10000);
            });
        });

        window.addEventListener('resize', () => {
            updateCoverflow(currentCfIdx);
        });

        setTimeout(() => {
            updateCoverflow(0);
            startCfAutoplay();
        }, 150);
    }

    // Initialize the slides animations
    goToGlobalSlide(0);
});