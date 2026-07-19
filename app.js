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
            svg: `<img src="assets/yumm_logo.png" style="max-height: 130px; max-width: 240px; object-fit: contain;" alt="Yumm Keralam Logo">`
        },
        dayone: {
            url: "https://dayonecafe.com",
            svg: `<img src="assets/dayone_logo.png" style="max-height: 110px; max-width: 240px; object-fit: contain;" alt="Day One Cafe Logo">`
        },
        thaichef: {
            url: "https://thaichef.fortimark.co",
            svg: `<div style="background: #06070a; padding: 12px 24px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center;"><img src="assets/thaichef_logo.png" style="max-height: 50px; max-width: 200px; object-fit: contain;" alt="Thai Chef Logo"></div>`
        },
        bologna: {
            url: "https://slateblue-hedgehog-572890.hostingersite.com",
            svg: `<img src="assets/bologna_logo.png" style="max-height: 110px; max-width: 250px; object-fit: contain;" alt="Bologna Logo">`
        },
        flame: {
            url: "https://instagram.com/once_upon_a_flame",
            svg: `<img src="assets/flame_logo.png" style="max-height: 120px; max-width: 120px; object-fit: contain; border-radius: 50%;" alt="Once Upon a Flame Logo">`
        },
        rajya: {
            url: "https://instagram.com/rajya.dvaar",
            svg: `<img src="assets/rajya_logo.png" style="max-height: 130px; max-width: 240px; object-fit: contain;" alt="Rajya Dvaar Logo">`
        },
        alley: {
            url: "https://instagram.com/cafedownthealley",
            svg: `<img src="assets/alley_logo.png" style="max-height: 130px; max-width: 240px; object-fit: contain;" alt="Cafe Down The Alley Logo">`
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