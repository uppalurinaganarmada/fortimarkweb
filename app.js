document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loading Screen Animation Fadeout
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 1200);
    }

    // 1b. Chessboard Background & Cinematic Logo Text Reveal Sequence
    const chessboardElement = document.getElementById('chessboard');
    const heroTitle = document.querySelector('.hero-title');
    const logoName = document.getElementById('logo-name');
    
    if (chessboardElement && heroTitle) {
        // Generate the 64 squares dynamically (empty background grid)
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = 'chess-square ' + ((row + col) % 2 === 0 ? 'square-light' : 'square-dark');
                chessboardElement.appendChild(square);
            }
        }

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
            svg: `<svg width="220" height="60" viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="50%" y="35" dominant-baseline="middle" text-anchor="middle" font-family="'Outfit', sans-serif" font-weight="800" font-size="18" fill="#081026" letter-spacing="0.05em">YUMM KERALAM</text>
                    <circle cx="180" cy="30" r="3" fill="#2563eb"/>
                  </svg>`
        },
        dayone: {
            url: "https://dayonecafe.com",
            svg: `<svg width="220" height="60" viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="50%" y="35" dominant-baseline="middle" text-anchor="middle" font-family="'Outfit', sans-serif" font-weight="600" font-size="18" fill="#081026" letter-spacing="0.12em">DAY ONE CAFE</text>
                  </svg>`
        },
        thaichef: {
            url: "https://thaichef.fortimark.co",
            svg: `<svg width="220" height="60" viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="50%" y="35" dominant-baseline="middle" text-anchor="middle" font-family="'Outfit', sans-serif" font-weight="700" font-size="20" fill="#081026" letter-spacing="0.1em">THAI CHEF</text>
                  </svg>`
        },
        bologna: {
            url: "https://slateblue-hedgehog-572890.hostingersite.com",
            svg: `<svg width="220" height="60" viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="50%" y="26" dominant-baseline="middle" text-anchor="middle" font-family="'Outfit', sans-serif" font-weight="800" font-size="18" fill="#081026" letter-spacing="0.08em">BOLOGNA</text>
                    <text x="50%" y="42" dominant-baseline="middle" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="400" font-size="10" fill="#475569" letter-spacing="0.05em">A TASTE OF ITALY</text>
                  </svg>`
        },
        flame: {
            url: "https://instagram.com/once_upon_a_flame",
            svg: `<svg width="220" height="60" viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="50%" y="35" dominant-baseline="middle" text-anchor="middle" font-family="'Outfit', sans-serif" font-weight="500" font-size="16" fill="#081026" letter-spacing="0.05em">ONCE UPON A FLAME</text>
                  </svg>`
        },
        rajya: {
            url: "https://instagram.com/rajya.dvaar",
            svg: `<svg width="220" height="60" viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="50%" y="35" dominant-baseline="middle" text-anchor="middle" font-family="'Outfit', sans-serif" font-weight="700" font-size="18" fill="#081026" letter-spacing="0.2em">RAJYA DVAAR</text>
                  </svg>`
        },
        alley: {
            url: "https://instagram.com/cafedownthealley",
            svg: `<svg width="220" height="60" viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="50%" y="35" dominant-baseline="middle" text-anchor="middle" font-family="'Inter', sans-serif" font-weight="700" font-size="13" fill="#081026" letter-spacing="0.08em">CAFE DOWN THE ALLEY</text>
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

    // 6. Intersection Observer for Scroll Fade-In Animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if ('IntersectionObserver' in window) {
        const fadeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
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