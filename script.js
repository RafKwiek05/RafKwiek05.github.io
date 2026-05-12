lucide.createIcons();

const checkbox = document.getElementById('theme-checkbox');
const html = document.documentElement;

// Obsługa zmiany
checkbox.addEventListener('change', () => {
    const targetTheme = checkbox.checked ? 'light' : 'dark';
    html.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
});

// Wczytywanie stanu przy starcie
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
checkbox.checked = (savedTheme === 'light');

// Prosta animacja pojawiania się (Scroll Reveal)
const cards = document.querySelectorAll('.card');
const observerOptions = { threshold: 0.1 };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.6s ease-out";
    observer.observe(card);
});