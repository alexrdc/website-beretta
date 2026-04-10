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

    function activateMarker(partId) {
        partMarkers.forEach(m => {
            m.classList.toggle('active', m.getAttribute('data-part') === partId);
        });
    }

    function clearMarkers() {
        partMarkers.forEach(m => m.classList.remove('active'));
    }

    partItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            activateMarker(item.getAttribute('data-part'));
        });
        item.addEventListener('mouseleave', clearMarkers);
        // Touch support for mobile
        item.addEventListener('touchstart', () => {
            activateMarker(item.getAttribute('data-part'));
        }, { passive: true });
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
