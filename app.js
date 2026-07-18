document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loading Screen Animation Fadeout
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 1200);
    }

    // 1b. Chessboard Dynamic Generation & Animation
    const chessboardElement = document.getElementById('chessboard');
    const heroTitle = document.querySelector('.hero-title');
    
    if (chessboardElement && heroTitle) {
        // Standard Chess SVGs in minimalist paths
        const SVGPieces = {
            pawn: `<svg viewBox="0 0 100 100"><circle cx="50" cy="35" r="13" fill="currentColor"/><path d="M38,78 L62,78 L57,53 L43,53 Z" fill="currentColor"/><rect x="33" y="78" width="34" height="5" rx="1.5" fill="currentColor"/></svg>`,
            rook: `<svg viewBox="0 0 100 100"><path d="M38,78 L62,78 L60,48 L40,48 Z" fill="currentColor"/><rect x="33" y="78" width="34" height="5" rx="1.5" fill="currentColor"/><path d="M36,48 L64,48 L64,38 L59,38 L59,42 L53,42 L53,38 L47,38 L47,42 L41,42 L41,38 L36,38 Z" fill="currentColor"/></svg>`,
            knight: `<svg viewBox="0 0 100 100"><path d="M33,78 L67,78 L67,73 Q60,68 58,58 Q65,53 65,43 Q65,28 50,28 Q35,28 35,43 Q35,53 42,58 Q33,68 33,78 Z" fill="currentColor"/><rect x="30" y="78" width="40" height="5" rx="1.5" fill="currentColor"/></svg>`,
            bishop: `<svg viewBox="0 0 100 100"><path d="M38,78 L62,78 Q60,48 50,38 Q40,48 38,78 Z" fill="currentColor"/><circle cx="50" cy="30" r="3.5" fill="currentColor"/><rect x="33" y="78" width="34" height="5" rx="1.5" fill="currentColor"/></svg>`,
            queen: `<svg viewBox="0 0 100 100"><path d="M38,78 L62,78 L67,45 L50,62 L33,45 Z" fill="currentColor"/><circle cx="33" cy="40" r="2.5" fill="currentColor"/><circle cx="50" cy="57" r="2.5" fill="currentColor"/><circle cx="67" cy="40" r="2.5" fill="currentColor"/><rect x="33" y="78" width="34" height="5" rx="1.5" fill="currentColor"/></svg>`,
            king: `<svg viewBox="0 0 100 100"><path d="M38,78 L62,78 L60,45 Q50,52 40,45 Z" fill="currentColor"/><rect x="33" y="78" width="34" height="5" rx="1.5" fill="currentColor"/><path d="M47,36 L53,36 M50,33 L50,40" stroke="currentColor" stroke-width="2.5" fill="none"/></svg>`,
            // Crowned Rook logo vector (our hero piece)
            logo: `<svg viewBox="0 0 100 120" class="crowned-rook-svg">
                    <rect x="20" y="95" width="60" height="15" rx="4" fill="#f3f4f6" />
                    <text x="50" y="105" font-family="'Outfit', sans-serif" font-size="5" font-weight="800" fill="#030408" text-anchor="middle">FORTIMARK.STUDIO</text>
                    <path d="M26,95 L32,55 L68,55 L74,95 Z" fill="#f3f4f6" />
                    <rect x="28" y="48" width="44" height="7" rx="1" fill="#f3f4f6" />
                    <path d="M25,48 L20,22 L34,34 L50,14 L66,34 L80,22 L75,48 Z" fill="#f3f4f6" />
                    <circle cx="50" cy="14" r="2.5" fill="#2563eb" />
                    <circle cx="20" cy="22" r="2" fill="#2563eb" />
                    <circle cx="80" cy="22" r="2" fill="#2563eb" />
                    <path d="M36,40 Q50,46 64,40" stroke="#030408" stroke-width="2.5" fill="none" />
                  </svg>`
        };

        // Starting board matrix configuration: 0-7 rows, 0-7 cols
        // We will populate standard positions:
        // Row 0: White major pieces. Row 1: White pawns.
        // Row 6: Black pawns. Row 7: Black major pieces.
        // And place our custom Crowned Rook Logo at Row 3, Col 4 (Center e5 square)!
        
        const startingBoard = [
            // Row 0: White pieces
            ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
            // Row 1: White pawns
            ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
            // Rows 2 & 3: Empty (with logo in center e5 = Row 3, Col 4)
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, 'logo', null, null, null], // Crowned Rook logo
            // Rows 4 & 5: Empty
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            // Row 6: Black pawns
            ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
            // Row 7: Black pieces
            ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
        ];

        // Generate the 64 squares dynamically
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = 'chess-square ' + ((row + col) % 2 === 0 ? 'square-light' : 'square-dark');
                
                const pieceType = startingBoard[row][col];
                if (pieceType) {
                    const pieceDiv = document.createElement('div');
                    
                    if (pieceType === 'logo') {
                        pieceDiv.className = 'chess-piece piece-logo';
                        pieceDiv.innerHTML = SVGPieces.logo;
                    } else {
                        // Set colors: rows 0 & 1 are White pieces, rows 6 & 7 are Black pieces
                        const isWhite = row < 2;
                        pieceDiv.className = 'chess-piece ' + (isWhite ? 'piece-white' : 'piece-black');
                        pieceDiv.innerHTML = SVGPieces[pieceType];
                    }
                    
                    // Staggered delay logic: animation starts from Row 0 (top) down to Row 7 (bottom)
                    // The Crowned Rook logo has a special delay to appear last as the grand finale!
                    let delayMs;
                    if (pieceType === 'logo') {
                        delayMs = 1800; // Logo drops last
                    } else {
                        // Stagger by row order (row 0 triggers at 200ms, row 7 at 1600ms)
                        delayMs = 200 + row * 180 + col * 20; 
                    }
                    
                    setTimeout(() => {
                        pieceDiv.classList.add('animate-in');
                    }, delayMs);
                    
                    square.appendChild(pieceDiv);
                }
                
                chessboardElement.appendChild(square);
            }
        }

        // Once the final logo piece drops, trigger the hero title fade-in
        setTimeout(() => {
            heroTitle.classList.add('title-fade-in');
        }, 2500); // 2.5s grand reveal trigger
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