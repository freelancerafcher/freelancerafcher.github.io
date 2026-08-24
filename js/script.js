/* =========================================================
   MD AFCHER UDDIN PORTFOLIO
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const header = document.getElementById("header");
    const navMenu = document.getElementById("navMenu");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.querySelectorAll(".nav-link");
    const backToTop = document.getElementById("backToTop");
    const currentYear = document.getElementById("currentYear");
    const contactForm = document.getElementById("contactForm");


    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ====================================================== */

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    handleHeaderScroll();

    window.addEventListener("scroll", handleHeaderScroll);


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    function openMenu() {

        if (!navMenu || !menuToggle) return;

        navMenu.classList.add("active");

        menuToggle.innerHTML =
            '<i class="fa-solid fa-xmark"></i>';

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        document.body.style.overflow = "hidden";

    }


    function closeMenu() {

        if (!navMenu || !menuToggle) return;

        navMenu.classList.remove("active");

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        document.body.style.overflow = "";

    }


    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            if (navMenu.classList.contains("active")) {
                closeMenu();
            } else {
                openMenu();
            }

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU AFTER LINK CLICK
    ====================================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ====================================================== */

    document.addEventListener("click", (event) => {

        if (!navMenu || !menuToggle) return;

        if (!navMenu.classList.contains("active")) return;

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            closeMenu();
        }

    });


    /* =====================================================
       CLOSE MOBILE MENU ON RESIZE
    ====================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {
            closeMenu();
        }

    });


    /* =====================================================
       SMOOTH SCROLL
    ====================================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const href = link.getAttribute("href");

            if (!href || href === "#") {
                return;
            }

            const target =
                document.querySelector(href);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       ACTIVE NAV LINK ON SCROLL
    ====================================================== */

    const sections =
        document.querySelectorAll("main section[id]");

    function updateActiveNavigation() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 180;

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =====================================================
       BACK TO TOP BUTTON
    ====================================================== */

    function handleBackToTopVisibility() {

        if (!backToTop) return;

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    }

    handleBackToTopVisibility();

    window.addEventListener(
        "scroll",
        handleBackToTopVisibility
    );


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       SCROLL REVEAL ELEMENTS
    ====================================================== */

    const revealSelectors = [
        ".section-heading",
        ".about-visual",
        ".about-content",
        ".service-card",
        ".why-content",
        ".why-visual",
        ".skill-card",
        ".portfolio-card",
        ".process-card",
        ".contact-info",
        ".contact-form-wrapper",
        ".cta-box"
    ];


    revealSelectors.forEach((selector) => {

        const elements =
            document.querySelectorAll(selector);

        elements.forEach((element) => {
            element.classList.add("reveal");
        });

    });


    /* =====================================================
       INTERSECTION OBSERVER
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "active"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -40px 0px"
                }

            );


        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("active");
        });

    }


    /* =====================================================
       STAGGER CARD ANIMATIONS
    ====================================================== */

    const staggerGroups = [
        ".services-grid .service-card",
        ".skills-wrapper .skill-card",
        ".portfolio-grid .portfolio-card",
        ".process-grid .process-card"
    ];


    staggerGroups.forEach((selector) => {

        const elements =
            document.querySelectorAll(selector);

        elements.forEach((element, index) => {

            element.style.transitionDelay =
                `${index * 80}ms`;

        });

    });


    /* =====================================================
       PORTFOLIO CARD EFFECT
    ====================================================== */

    const portfolioCards =
        document.querySelectorAll(".portfolio-card");

    portfolioCards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {

                const icon =
                    card.querySelector(
                        ".portfolio-placeholder i"
                    );

                if (icon) {
                    icon.style.transform =
                        "translateY(-8px) scale(1.05)";
                }

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                const icon =
                    card.querySelector(
                        ".portfolio-placeholder i"
                    );

                if (icon) {
                    icon.style.transform = "";
                }

            }
        );

    });


    /* =====================================================
       CONTACT FORM
       FormSubmit handles actual email sending.
       JS only improves button UX.
    ====================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            () => {

                const submitButton =
                    contactForm.querySelector(
                        ".form-submit"
                    );

                if (!submitButton) {
                    return;
                }

                submitButton.disabled = true;

                submitButton.innerHTML = `
                    Sending...
                    <i class="fa-solid fa-spinner fa-spin"></i>
                `;

            }
        );

    }


    /* =====================================================
       BUTTON RIPPLE EFFECT
    ====================================================== */

    const rippleButtons =
        document.querySelectorAll(
            ".primary-btn, .nav-btn, .cta-btn"
        );


    rippleButtons.forEach((button) => {

        button.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement("span");

                ripple.classList.add("js-ripple");

                const rect =
                    button.getBoundingClientRect();

                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );

                const x =
                    event.clientX -
                    rect.left -
                    size / 2;

                const y =
                    event.clientY -
                    rect.top -
                    size / 2;

                ripple.style.width =
                    `${size}px`;

                ripple.style.height =
                    `${size}px`;

                ripple.style.left =
                    `${x}px`;

                ripple.style.top =
                    `${y}px`;

                button.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);

            }
        );

    });


    /* =====================================================
       RIPPLE CSS
       Injected through JS to avoid editing CSS again.
    ====================================================== */

    const rippleStyle =
        document.createElement("style");

    rippleStyle.textContent = `

        .primary-btn,
        .nav-btn,
        .cta-btn {
            position: relative;
            overflow: hidden;
        }

        .js-ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(
                255,
                255,
                255,
                0.25
            );
            transform: scale(0);
            animation: jsRippleEffect 0.6s linear;
            pointer-events: none;
        }

        @keyframes jsRippleEffect {

            to {
                transform: scale(4);
                opacity: 0;
            }

        }

        .form-submit:disabled {
            opacity: 0.8;
            cursor: wait;
        }

    `;

    document.head.appendChild(rippleStyle);


    /* =====================================================
       PREVENT EMPTY PLACEHOLDER LINKS
    ====================================================== */

    const emptyLinks =
        document.querySelectorAll('a[href="#"]');

    emptyLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {
                event.preventDefault();
            }
        );

    });


    /* =====================================================
       PAGE READY
    ====================================================== */

    document.body.classList.add("page-ready");

});

/* =========================================================
   PORTFOLIO FILTER + IMAGE LIGHTBOX
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const filters = document.querySelectorAll(".portfolio-filter");
    const cards = document.querySelectorAll(".full-proof-card");

    filters.forEach((filter) => {
        filter.addEventListener("click", () => {
            const value = filter.dataset.filter;
            filters.forEach((item) => item.classList.remove("active"));
            filter.classList.add("active");
            cards.forEach((card) => {
                const visible = value === "all" || card.dataset.category === value;
                card.classList.toggle("is-hidden", !visible);
            });
        });
    });

    const lightbox = document.getElementById("proofLightbox");
    const lightboxImage = document.getElementById("proofLightboxImage");
    const lightboxTitle = document.getElementById("proofLightboxTitle");
    const lightboxClose = document.getElementById("proofLightboxClose");
    const proofButtons = document.querySelectorAll(".proof-open");

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lightbox-open");
    };

    proofButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (!lightbox || !lightboxImage) return;
            lightboxImage.src = button.dataset.image || "";
            lightboxImage.alt = button.dataset.title || "Portfolio project preview";
            if (lightboxTitle) lightboxTitle.textContent = button.dataset.title || "";
            lightbox.classList.add("open");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.classList.add("lightbox-open");
        });
    });

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    if (lightbox) lightbox.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeLightbox(); });
});
