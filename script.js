/* ============================================
   BERETTA PX4 STORM — JavaScript
   Navigation and scroll animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // === MOBILE NAV TOGGLE ===
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // === SCROLL REVEAL ANIMATION ===
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // === ACTIVE NAV LINK ON SCROLL ===
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    function updateActiveNav() {
        const scrollY = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // === NAVBAR SHADOW ON SCROLL ===
    const navbar = document.getElementById('navbar');
    function updateNavbar() {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }
    window.addEventListener('scroll', updateNavbar, { passive: true });

    // === PARTS HOVER → IMAGE MARKER SYNC ===
    const partItems = document.querySelectorAll('.parts-list li[data-part]');
    const partMarkers = document.querySelectorAll('.part-marker');
    const componentsImage = document.querySelector('.image-overlay-wrapper');

    function activateMarker(partId) {
        partMarkers.forEach(m => {
            m.classList.toggle('active', m.getAttribute('data-part') === partId);
        });
    }

    function clearMarkers() {
        partMarkers.forEach(m => m.classList.remove('active'));
    }

    function isMobile() {
        return window.innerWidth <= 900;
    }

    let activePartId = null;

    partItems.forEach(item => {
        // Desktop hover
        item.addEventListener('mouseenter', () => {
            if (!isMobile()) {
                activateMarker(item.getAttribute('data-part'));
            }
        });
        item.addEventListener('mouseleave', () => {
            if (!isMobile()) {
                clearMarkers();
            }
        });

        // Mobile click → scroll to image + persistent highlight
        item.addEventListener('click', (e) => {
            if (isMobile()) {
                e.preventDefault();
                const partId = item.getAttribute('data-part');

                // Toggle: if same part clicked, deactivate
                if (activePartId === partId) {
                    clearMarkers();
                    activePartId = null;
                    return;
                }

                activateMarker(partId);
                activePartId = partId;

                // Smooth scroll to image, centered in viewport
                if (componentsImage) {
                    // Small delay to ensure marker animation starts first
                    setTimeout(() => {
                        componentsImage.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 50);
                }
            }
        });
    });

    // Clear active state when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (isMobile() && activePartId) {
            if (!e.target.closest('.parts-list') && !e.target.closest('.image-overlay-wrapper')) {
                clearMarkers();
                activePartId = null;
            }
        }
    });

    // === SMOOTH SCROLL FOR ANCHOR LINKS (fallback for older browsers) ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

});
