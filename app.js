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
            description: "High-performing website infrastructure, digital reservation connections, and visual menu storytelling.",
            url: "https://slateblue-hedgehog-572890.hostingersite.com",
            logo: "assets/bologna_logo.png",
            waveColor: "linear-gradient(135deg, #1c2841, #0f172a)",
            accentColor: "#3b82f6",
            logoStyle: "max-height: 220px; max-width: 380px;"
        },
        yumm: {
            title: "Yumm Keralam",
            subtitle: "Authentic Kerala Cuisine & Dining",
            description: "Full-stack digital presence, search engine positioning, and culinary brand storytelling.",
            url: "https://yummkeralam.com",
            logo: "assets/yumm_web_logo.png",
            waveColor: "linear-gradient(135deg, #881337, #4c0519)",
            accentColor: "#f43f5e",
            logoStyle: "max-height: 240px; max-width: 360px;"
        },
        dayone: {
            title: "Day One Cafe",
            subtitle: "Artisanal Coffee & Specialty Bistro",
            description: "AI WhatsApp automation, retention workflows, and social engagement strategy.",
            url: "https://dayonecafe.com",
            logo: "assets/dayone_web_logo.png",
            waveColor: "linear-gradient(135deg, #2f4a37, #142318)",
            accentColor: "#10b981",
            logoStyle: "max-height: 220px; max-width: 360px;"
        },
        thaichef: {
            title: "Thai Chef",
            subtitle: "Authentic Thai Flavours & Asian Dining",
            description: "Targeted performance marketing, Google Business optimization, and campaign execution.",
            url: "https://thaichef.fortimark.co",
            logo: "assets/thaichef_web_logo.png",
            waveColor: "linear-gradient(135deg, #18181b, #09090b)",
            accentColor: "#eab308",
            logoStyle: "max-height: 220px; max-width: 360px;"
        },
        flame: {
            title: "Once Upon a Flame",
            subtitle: "Charcoal & Flame Grill Experience",
            description: "High-octane reel content, photography, and viral audience engagement campaigns.",
            url: "https://instagram.com/once_upon_a_flame",
            logo: "assets/flame_logo.png",
            waveColor: "linear-gradient(135deg, #7c2d12, #451a03)",
            accentColor: "#f97316",
            logoStyle: "max-height: 230px; max-width: 230px; border-radius: 50%;"
        },
        rajya: {
            title: "Rajya Dvaar",
            subtitle: "Royal Heritage Culinary Experience",
            description: "Brand positioning, luxury identity, and online reputation management.",
            url: "https://instagram.com/rajya.dvaar",
            logo: "assets/rajya_logo.png",
            waveColor: "linear-gradient(135deg, #581c87, #3b0764)",
            accentColor: "#a855f7",
            logoStyle: "max-height: 230px; max-width: 360px;"
        },
        alley: {
            title: "Cafe Down The Alley",
            subtitle: "Cozy Specialty Cafe & Hangout",
            description: "Customer acquisition funnels, local discovery SEO, and community engagement.",
            url: "https://instagram.com/cafedownthealley",
            logo: "assets/alley_logo.png",
            waveColor: "linear-gradient(135deg, #0369a1, #075985)",
            accentColor: "#38bdf8",
            logoStyle: "max-height: 230px; max-width: 360px;"
        }
    };

    const thumbBtns = document.querySelectorAll('.thumb-btn');
    const showcaseTitle = document.getElementById('showcase-title');
    const showcaseSub = document.getElementById('showcase-sub');
    const showcaseDesc = document.getElementById('showcase-desc');
    const showcaseCta = document.getElementById('showcase-cta');
    const organicWaveBg = document.getElementById('organic-wave-bg');
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
                btn.style.setProperty('--accent', data.accentColor);
            } else {
                btn.classList.remove('active');
            }
        });

        // Animate out logo & text
        if (showcaseLogoContainer) {
            showcaseLogoContainer.style.opacity = '0';
            showcaseLogoContainer.style.transform = 'scale(0.85) translateY(20px)';
        }

        setTimeout(() => {
            // Update Text Content
            if (showcaseTitle) {
                showcaseTitle.textContent = data.title;
                showcaseTitle.style.color = '#ffffff';
            }
            if (showcaseSub) {
                showcaseSub.textContent = data.subtitle;
                showcaseSub.style.color = data.accentColor;
            }
            if (showcaseDesc) showcaseDesc.textContent = data.description;
            if (showcaseCta) {
                showcaseCta.setAttribute('href', data.url);
                showcaseCta.innerHTML = data.url.includes('instagram') ? 'View Instagram &rarr;' : 'Visit Official Website &rarr;';
            }

            // Update Organic Wave Background Color
            if (organicWaveBg) {
                organicWaveBg.style.background = data.waveColor;
                organicWaveBg.style.boxShadow = `0 20px 50px ${data.accentColor}44`;
            }

            // Update Logo Image
            if (showcaseLogoImg) {
                showcaseLogoImg.setAttribute('src', data.logo);
                showcaseLogoImg.setAttribute('alt', `${data.title} Logo`);
                showcaseLogoImg.setAttribute('style', data.logoStyle);
            }

            // Animate back in
            if (showcaseLogoContainer) {
                showcaseLogoContainer.style.opacity = '1';
                showcaseLogoContainer.style.transform = 'scale(1) translateY(0)';
            }
        }, 220);
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