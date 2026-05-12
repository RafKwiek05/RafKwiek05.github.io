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

const input = document.getElementById('terminal-input');
const output = document.getElementById('terminal-output');

const commands = {
    help: "Dostępne komendy: contact, coffee, work, clear, whoami",
    contact: "Email: twoj-email@przykład.pl | GitHub: github.com/twój-nick",
    whoami: "Junior Engineer. Ekspert od ciężkiej pracy i czystego kodu.",
    work: "Austria, Niemcy, Holandia... Nie boję się wyzwań. Sprawdź oś czasu!",
    clear: ""
};

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const fullCommand = input.value.toLowerCase().trim();
        const line = document.createElement('div');
        line.className = 'line';
        line.innerHTML = `<span class="prompt">guest@portfolio:~$</span> ${fullCommand}`;
        output.appendChild(line);

        // Obsługa komendy coffee (Easter Egg)
        if (fullCommand === 'coffee') {
            document.documentElement.style.setProperty('--accent', '#6F4E37'); // Brązowy
            const response = document.createElement('div');
            response.style.color = '#fff';
            response.innerText = "☕ Kawa zaparzona. Styl zmieniony na Coffee Mode!";
            output.appendChild(response);
        } 
        // Obsługa czyszczenia
        else if (fullCommand === 'clear') {
            output.innerHTML = '';
        }
        // Standardowe komendy
        else if (commands[fullCommand]) {
            const response = document.createElement('div');
            response.innerText = commands[fullCommand];
            output.appendChild(response);
        } 
        // Nieznana komenda
        else {
            const error = document.createElement('div');
            error.innerText = `Command not found: ${fullCommand}`;
            error.style.color = '#ff5f56';
            output.appendChild(error);
        }

        input.value = '';
        output.scrollTop = output.scrollHeight; // Autoscroll na dół
    }
});