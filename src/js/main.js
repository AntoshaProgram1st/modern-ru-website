document.addEventListener('DOMContentLoaded', () => {
    // --- Новий код підсвічування меню ---
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const sections = navLinks
        .map(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const section = document.querySelector(href);
                return section ? { link, section } : null;
            }
            return null;
        })
        .filter(Boolean);

    function getSectionTop(section) {
        const rect = section.getBoundingClientRect();
        return rect.top + window.scrollY;
    }

    function highlightMenu() {
        const scrollPos = window.scrollY + window.innerHeight / 3;
        let current = sections[0];
        for (let i = 0; i < sections.length; i++) {
            const { section } = sections[i];
            if (getSectionTop(section) <= scrollPos) {
                current = sections[i];
            }
        }
        navLinks.forEach(link => link.classList.remove('active'));
        if (current) current.link.classList.add('active');
    }

    window.addEventListener('scroll', highlightMenu);
    window.addEventListener('resize', highlightMenu);
    highlightMenu();

    // --- Intersection Observer для меню: спостерігаємо за секціями з id ---
    const sectionMap = navLinks.map(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const section = document.querySelector(href);
            return { link, section };
        }
        return null;
    }).filter(Boolean);

    let lastActiveSection = null;
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40% 0px',
        threshold: 0.25
    };
    const observerCallback = (entries) => {
        let maxRatio = 0;
        let mostVisible = null;
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                maxRatio = entry.intersectionRatio;
                mostVisible = entry.target;
            }
        });
        if (mostVisible && lastActiveSection !== mostVisible) {
            lastActiveSection = mostVisible;
            sectionMap.forEach(({ link, section }) => {
                link.classList.toggle('active', section === mostVisible);
            });
        }
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionMap.forEach(({ section }) => {
        if (section) observer.observe(section);
    });

    // Прокрутка до секції за кліком на "Рекомендації" або "Отзывы"
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#recommendations' || href === '#reviews') {
                e.preventDefault();
                const section = document.querySelector(href);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Agreement functionality
    const modal = document.getElementById('agreementModal');
    const showAgreement = document.getElementById('showAgreement');
    const closeModal = document.querySelector('.close-modal');
    const checkbox = document.querySelector('input[name="agreement"]');
    const submitBtn = document.querySelector('.submit-btn');

    if (showAgreement && modal) {
        showAgreement.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
        });
    }
    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    if (checkbox && submitBtn) {
        checkbox.addEventListener('change', (e) => {
            submitBtn.disabled = !e.target.checked;
        });
    }
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    const logoLink = document.getElementById('logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Help Form: інтерактивність, PDF, угода, валідація ---
    const helpForm = document.getElementById('helpForm');
    if (helpForm) {
        const submitBtn = helpForm.querySelector('.submit-btn');
        const agreement = helpForm.querySelector('input[name="agreement"]');
        const pdfLink = helpForm.querySelector('.pdf-link');
        const agreementLink = helpForm.querySelector('.agreement-link');
        const fileInput = helpForm.querySelector('input[type="file"]');
        const fileNamesDiv = helpForm.querySelector('.file-names');

        // Валідація: чекбокс
        if (agreement && submitBtn) {
            agreement.addEventListener('change', () => {
                submitBtn.disabled = !agreement.checked;
            });
            submitBtn.disabled = !agreement.checked;
        }

        // Валідація: 3 фото
        if (fileInput) {
            fileInput.addEventListener('change', () => {
                if (fileInput.files.length !== 3) {
                    fileInput.setCustomValidity('Загрузите 3 фото паспорта');
                } else {
                    fileInput.setCustomValidity('');
                }
            });
        }

        // Відображення імен вибраних файлів
        if (fileInput && fileNamesDiv) {
            fileInput.addEventListener('change', () => {
                fileNamesDiv.innerHTML = '';
                if (fileInput.files.length > 0) {
                    Array.from(fileInput.files).forEach(file => {
                        const span = document.createElement('span');
                        span.textContent = file.name;
                        fileNamesDiv.appendChild(span);
                    });
                }
            });
        }

        // PDF-заглушка
        if (pdfLink) {
            pdfLink.addEventListener('click', (e) => {
                // PDF відкривається у новій вкладці, нічого не змінюємо
            });
        }

        // Посилання на угоду
        if (agreementLink) {
            agreementLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.open('agreement.html', '_blank');
            });
        }

        // Відправка форми
        helpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!agreement.checked) return;
            if (fileInput && fileInput.files.length !== 3) {
                fileInput.setCustomValidity('Загрузите 3 фото паспорта');
                fileInput.reportValidity();
                return;
            }
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправлено!';
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить заявку';
                helpForm.reset();
            }, 2000);
        });
    }

    // WOW-ефект: плавна поява секцій при скролі
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.section-container, .offers-section, .info-section, .reviews-section, .recommendations-section, .help-section').forEach(el => {
        sectionObserver.observe(el);
    });

    // Додаємо виклики глобальних функцій після ініціалізації DOM
    if (typeof renderOffers === 'function') renderOffers();
    if (typeof loadMfoList === 'function') loadMfoList();

    // --- Исправление: клик по ссылке на info из отзывов ---
    // (без дублювання navLinks, sectionIds, sections)
    const reviewsSection = document.getElementById('reviews');
    if (reviewsSection) {
        reviewsSection.addEventListener('click', function(e) {
            const target = e.target.closest('a');
            if (target && target.getAttribute('href') === '#info') {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#info');
                });
            }
        });
    }

    const burger = document.querySelector('.burger-menu');
    const navList = document.querySelector('.nav-list');
    if (burger && navList) {
        burger.addEventListener('click', function(e) {
            e.stopPropagation();
            navList.classList.toggle('nav-open');
            burger.classList.toggle('open');
        });
        navList.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('nav-open');
                burger.classList.remove('open');
            });
        });
        // Закриття по кліку поза меню
        document.addEventListener('click', (e) => {
            if (
                navList.classList.contains('nav-open') &&
                !navList.contains(e.target) &&
                !burger.contains(e.target)
            ) {
                navList.classList.remove('nav-open');
                burger.classList.remove('open');
            }
        });
    }
});