document.addEventListener('DOMContentLoaded', () => {
    
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

    if (vennCircles.length > 0 && detailsPanels.length > 0) {
        vennCircles.forEach(circle => {
            circle.addEventListener('click', () => {
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

    // 5. Interactive Brand Scroll Animation (Roll up -> Swap Logo -> Roll down)
    const brandButtons = document.querySelectorAll('.brand-btn');
    const scrollFrame = document.getElementById('brand-scroll');
    const scrollLogoLink = document.getElementById('scroll-logo-link');

    // Vector brand logos inside the scroll canvas (filled with dark navy #081026 for contrast)
    const brandLogos = {
        yumm: {
            url: "https://yummkeralam.com",
            svg: `<svg width="260" height="80" viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M130 8 C145 8 152 20 152 33 C152 46 140 48 130 48 C120 48 108 46 108 33 C108 20 115 8 130 8 Z" fill="#15803d" opacity="0.15"/>
                    <path d="M130 11 C120 18 120 38 130 45 C140 18 140 18 130 11 Z" fill="#16a34a"/>
                    <path d="M130 11 L130 45" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M130 20 L136 23" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"/>
                    <path d="M130 26 L137 29" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"/>
                    <path d="M130 32 L136 35" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"/>
                    <path d="M130 23 L124 26" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"/>
                    <path d="M130 29 L123 32" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"/>
                    <text x="50%" y="68" dominant-baseline="middle" text-anchor="middle" font-family="'Outfit', sans-serif" font-weight="800" font-size="16" fill="#081026" letter-spacing="0.05em">YUMM KERALAM</text>
                  </svg>`
        },
        dayone: {
            url: "https://dayonecafe.com",
            svg: `<svg width="260" height="80" viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M120 29 C120 39 128 42 138 42 C148 42 156 39 156 29 L120 29 Z" fill="#b45309"/>
                    <path d="M156 32 C160 32 163 29 163 26 C163 23 160 23 156 26" stroke="#b45309" stroke-width="3" stroke-linecap="round"/>
                    <path d="M117 45 L159 45" stroke="#b45309" stroke-width="2.5" stroke-linecap="round"/>
                    <path d="M128 21 C128 17 131 16 131 12" stroke="#b45309" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M137 22 C137 18 140 17 140 13" stroke="#b45309" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M146 21 C146 17 149 16 149 12" stroke="#b45309" stroke-width="1.5" stroke-linecap="round"/>
                    <text x="50%" y="68" dominant-baseline="middle" text-anchor="middle" font-family="'Outfit', sans-serif" font-weight="700" font-size="16" fill="#081026" letter-spacing="0.12em">DAY ONE CAFE</text>
                  </svg>`
        },
        thaichef: {
            url: "https://thaichef.fortimark.co",
            svg: `<svg width="260" height="80" viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M130 9 L142 24 L118 24 Z" fill="#d97706"/>
                    <path d="M130 9 C130 9 135 19 150 22 C145 25 135 25 130 25 C125 25 115 25 110 22 C125 19 130 9 130 9 Z" fill="#f59e0b"/>
                    <path d="M112 29 L148 29 C152 29 154 32 154 35 L106 35 C106 32 108 29 112 29 Z" fill="#d97706"/>
                    <text x="50%" y="68" dominant-baseline="middle" text-anchor="middle" font-family="'Outfit', sans-serif" font-weight="800" font-size="18" fill="#081026" letter-spacing="0.1em">THAI CHEF</text>
                  </svg>`
        },
        bologna: {
            url: "https://slateblue-hedgehog-572890.hostingersite.com",
            svg: `<svg width="260" height="80" viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M120 11 H140 V25 C140 31 130 37 130 37 C130 37 120 31 120 25 V11 Z" fill="#e2e8f0"/>
                    <path d="M120 11 H127 V32 C127 32 120 29 120 25 V11 Z" fill="#16a34a"/>
                    <path d="M133 11 H140 V25 C140 29 133 32 133 32 V11 Z" fill="#dc2626"/>
                    <path d="M130 7 V29" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
                    <path d="M126 9 V15" stroke="#475569" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M134 9 V15" stroke="#475569" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M124 19 C128 17 132 21 136 19" stroke="#eab308" stroke-width="2" fill="none" stroke-linecap="round"/>
                    <text x="50%" y="54" dominant-baseline="middle" text-anchor="middle" font-family="'Outfit', sans-serif" font-weight="800" font-size="16" fill="#081026" letter-spacing="0.08em">BOLOGNA</text>
                    <text x="50%" y="70" dominant-baseline="middle" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="500" font-size="9" fill="#64748b" letter-spacing="0.05em">A TASTE OF ITALY</text>
                  </svg>`
        },
        flame: {
            url: "https://instagram.com/once_upon_a_flame",
            svg: `<svg width="260" height="80" viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M130 7 C138 17 144 23 144 31 C144 39 138 43 130 43 C122 43 116 39 116 31 C116 22 125 15 130 7 Z" fill="#ea580c"/>
                    <path d="M130 17 C134 23 138 27 138 32 C138 37 134 39 130 39 C126 39 122 37 122 32 C122 27 127 22 130 17 Z" fill="#f59e0b"/>
                    <path d="M120 41 L140 45" stroke="#78350f" stroke-width="3" stroke-linecap="round"/>
                    <path d="M140 41 L120 45" stroke="#78350f" stroke-width="3" stroke-linecap="round"/>
                    <text x="50%" y="68" dominant-baseline="middle" text-anchor="middle" font-family="'Outfit', sans-serif" font-weight="600" font-size="14" fill="#081026" letter-spacing="0.05em">ONCE UPON A FLAME</text>
                  </svg>`
        },
        rajya: {
            url: "https://instagram.com/rajya.dvaar",
            svg: `<svg width="260" height="80" viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M118 42 V23 C118 17 124 11 130 11 C136 11 142 17 142 23 V42" stroke="#991b1b" stroke-width="3.5" stroke-linecap="round" fill="none"/>
                    <path d="M123 42 V25 C123 22 126 19 130 19 C134 19 137 22 137 25 V42" fill="#991b1b" opacity="0.15"/>
                    <path d="M112 43 H148" stroke="#991b1b" stroke-width="3" stroke-linecap="round"/>
                    <path d="M130 5 V11" stroke="#991b1b" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="130" cy="5" r="2" fill="#991b1b"/>
                    <text x="50%" y="68" dominant-baseline="middle" text-anchor="middle" font-family="'Outfit', sans-serif" font-weight="800" font-size="16" fill="#081026" letter-spacing="0.2em">RAJYA DVAAR</text>
                  </svg>`
        },
        alley: {
            url: "https://instagram.com/cafedownthealley",
            svg: `<svg width="260" height="80" viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M130 42 V15" stroke="#0f766e" stroke-width="2.5" stroke-linecap="round"/>
                    <path d="M125 15 H135" stroke="#0f766e" stroke-width="2" stroke-linecap="round"/>
                    <path d="M127 15 L125 23 H135 L133 15 Z" fill="#0f766e"/>
                    <circle cx="130" cy="19" r="2.5" fill="#f59e0b"/>
                    <path d="M122 42 H138" stroke="#0f766e" stroke-width="3" stroke-linecap="round"/>
                    <text x="50%" y="68" dominant-baseline="middle" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="800" font-size="13" fill="#081026" letter-spacing="0.08em">CAFE DOWN THE ALLEY</text>
                  </svg>`
        }
    };

    if (brandButtons.length > 0 && scrollFrame && scrollLogoLink) {
        brandButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('active')) return;

                brandButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const brandKey = btn.getAttribute('data-brand');
                const brandData = brandLogos[brandKey];

                if (brandData) {
                    scrollFrame.classList.remove('unrolled');

                    setTimeout(() => {
                        scrollLogoLink.setAttribute('href', brandData.url);
                        scrollLogoLink.innerHTML = brandData.svg;
                        scrollFrame.classList.add('unrolled');
                    }, 420);
                }
            });
        });
    }

    // 6. Navbar Click Interceptor & Staggered Section Animations
    const navLinksList = document.querySelectorAll('.nav-link');
    
    function triggerSectionClickAnimation(targetId) {
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;
        
        // Ensure targeted section is visible
        targetSection.classList.add('visible');

        // Staggered left-to-right slide for elements in the section
        const slideElements = targetSection.querySelectorAll('.slide-left-to-right');
        
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
                    
                    // Trigger guided outcomes animation when outcomes section enters viewport
                    if (entry.target.id === 'results') {
                        triggerSectionClickAnimation('#results');
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