document.addEventListener('DOMContentLoaded', () => {
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    // Враховуємо всі секції з id, включаючи recommendations
    const sections = Array.from(document.querySelectorAll('section[id]'));

    function updateActiveNav() {
        const scrollY = window.scrollY;
        let currentId = sections[0].id;
        for (const section of sections) {
            const rect = section.getBoundingClientRect();
            // Враховуємо висоту хедера (70px) + запас
            if (rect.top <= 90 && rect.bottom > 90) {
                currentId = section.id;
                break;
            }
        }
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
});
