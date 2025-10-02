document.addEventListener('DOMContentLoaded', function() {

    // --- MENÚ MÓVIL ---
    const burger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('nav-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');

    function toggleMenu() {
        if (mobileMenu && burger) {
            burger.classList.toggle('active');
            const isExpanded = burger.getAttribute('aria-expanded') === 'true';
            burger.setAttribute('aria-expanded', !isExpanded);
            burger.setAttribute('aria-label', isExpanded ? 'Abrir menú' : 'Cerrar menú');

            mobileMenu.classList.toggle('show');
            mobileMenu.setAttribute('aria-hidden', isExpanded);
            if (overlay) overlay.classList.toggle('show'); // 'show' en CSS debe controlar la visibilidad
        }
    }

    if (burger) {
        burger.addEventListener('click', toggleMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', toggleMenu);
    }

    const mobileSubmenuToggles = document.querySelectorAll('.mobile-menu .has-submenu > a');
    mobileSubmenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(event) {
            event.preventDefault();
            const submenu = this.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                submenu.classList.toggle('submenu-open');
            }
        });
    });

    // --- ACTUALIZAR AÑO EN FOOTER ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- EFECTO DE HEADER AL HACER SCROLL ---
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > siteHeader.offsetHeight) {
                siteHeader.classList.add('header-hidden');
            } else {
                siteHeader.classList.remove('header-hidden');
            }

            lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
        });
    }

    // --- ANIMACIÓN DE ENTRADA PARA SECCIONES ---
    const sections = document.querySelectorAll('.page-section');
    if (sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('section-hidden');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            section.classList.add('section-hidden');
            sectionObserver.observe(section);
        });
    }

    // --- HERO CARRUSEL INTERACTIVO ---
    const heroCarousel = new Swiper('#inicio.swiper-container', {
        loop: true,
        effect: 'fade', // Cambiado a efecto de desvanecimiento
        fadeEffect: {
            crossFade: true // Asegura una transición suave
        },
        speed: 1000, // Aumentamos ligeramente la velocidad para un fade más suave
        grabCursor: true,
        watchSlidesProgress: true,
        autoplay: {
            delay: 8000,
            disableOnInteraction: true,
        },
        pagination: {
            el: '.hero .swiper-pagination',
            clickable: true,
        },
    });

    // --- ALLIED BRANDS CAROUSEL ---
    const brandsCarousel = new Swiper('.allied-brands-carousel', {
        speed: 5000, // Velocidad de la transición
        loop: true,
        allowTouchMove: false, // Desactiva la interacción del usuario
        autoplay: {
            delay: 0, // Sin pausa entre transiciones
            disableOnInteraction: false,
        },
        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 4,
                spaceBetween: 30
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 5,
                spaceBetween: 40
            }
        }
    });


    // --- CARRUSEL DE PROPÓSITO (Desactivado para el nuevo diseño de columnas) ---
    // const purposeCarousel = new Swiper('.purpose-carousel', {
    //     loop: true,
    //     effect: 'fade',
    //     fadeEffect: {
    //         crossFade: true
    //     },
    //     autoplay: {
    //         delay: 7000,
    //         disableOnInteraction: false,
    //     },
    //     speed: 1000,
    //     allowTouchMove: false,
    // });

    // --- PRODUCT DETAIL PAGE GALLERY ---
    const productGallery = document.querySelector('.product-gallery');

    if (productGallery) {
        const mainImage = productGallery.querySelector('.main-image img');
        const thumbnails = productGallery.querySelectorAll('.thumbnail-images .thumbnail');

        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // 1. Update main image source
                // This is a placeholder logic. In a real scenario, you might use data-attributes for full-size image URLs.
                const newSrc = this.src.replace('150x150', '600x600');
                mainImage.src = newSrc;

                // 2. Update active thumbnail
                // Remove 'active' class from the current active thumbnail
                const currentActive = document.querySelector('.thumbnail.active');
                if (currentActive) {
                    currentActive.classList.remove('active');
                }
                // Add 'active' class to the clicked thumbnail
                this.classList.add('active');
            });
        });
    }

    // --- ADD TO CART BUTTON ANIMATION ---
    const addToCartButtons = document.querySelectorAll('.product-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Si el botón ya está en estado 'added', no hacer nada
            if (this.classList.contains('added')) {
                return;
            }

            // Añadir la clase para la animación
            this.classList.add('added');

            // Volver al estado original después de 2 segundos
            setTimeout(() => {
                this.classList.remove('added');
            }, 2000);
        });
    });

    // --- BOTÓN FLOTANTE DE DONACIÓN CON CAMBIO DE COLOR ---
    const floatingBtn = document.querySelector('.floating-donate-btn');
    const redSections = document.querySelectorAll('.cta-section'); // Secciones con fondo rojo

    if (floatingBtn && redSections.length > 0) {
        const observerOptions = {
            root: null, // Observa intersecciones en el viewport
            rootMargin: '-50% 0px -50% 0px', // Activa cuando la sección está en el centro vertical
            threshold: 0
        };

        const intersectionObserver = new IntersectionObserver((entries) => {
            let isIntersecting = false;
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    isIntersecting = true;
                }
            });

            floatingBtn.classList.toggle('invert-colors', isIntersecting);
        }, observerOptions);

        redSections.forEach(section => {
            intersectionObserver.observe(section);
        });
    }
});
