/* ====== Função: Atualiza data e hora no header ====== */
function startDateTime() {
    const el = document.getElementById('datetime');
    if (!el) return;

    function update() {
        const now = new Date();
        // Ex.: Quinta-feira, 5 de setembro de 2025 - 22:30:15
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const dateStr = now.toLocaleDateString('pt-BR', options);
        const timeStr = now.toLocaleTimeString('pt-BR');
        el.textContent = `${capitalize(dateStr)} — ${timeStr}`;
    }

    update();
    // Atualiza a cada segundo para mostrar relógio ativo
    setInterval(update, 1000);
}

/* ====== Ajuda: primeira letra maiúscula para a data ====== */
function capitalize(text) {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
}

/* ====== Toggle Contraste Alto (simples) ====== */
function initContrastToggle() {
    const btn = document.getElementById('toggle-contrast');
    if (!btn) return;

    const body = document.body;
    // Armazena preferência no localStorage para persistência simples
    const storageKey = 'minimercado_high_contrast';
    const stored = localStorage.getItem(storageKey);
    if (stored === 'true') {
        body.classList.add('high-contrast');
        btn.setAttribute('aria-pressed', 'true');
    }

    btn.addEventListener('click', () => {
        const enabled = body.classList.toggle('high-contrast');
        btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
        localStorage.setItem(storageKey, enabled ? 'true' : 'false');
    });
}

/* ====== Acessibilidade do carrossel ======
   Exemplo simples: pausa o carrossel quando usuário foca controles via teclado. */
function initCarouselA11y() {
    const carouselEl = document.getElementById('promoCarousel');
    if (!carouselEl) return;

    // Se o usuário focar dentro do carrossel, pausamos para dar tempo para leitura.
    carouselEl.addEventListener('focusin', () => {
        const carousel = bootstrap.Carousel.getInstance(carouselEl);
        if (carousel) carousel.pause();
    });

    carouselEl.addEventListener('focusout', () => {
        const carousel = bootstrap.Carousel.getInstance(carouselEl);
        if (carousel) carousel.cycle();
    });
}

/* ====== Inicialização ao carregar a página ====== */
document.addEventListener('DOMContentLoaded', () => {
    startDateTime();
    initContrastToggle();
    initCarouselA11y();

    // Inicia o carrossel com configuração leve (se necessário)
    const promoEl = document.getElementById('promoCarousel');
    if (promoEl) {
        new bootstrap.Carousel(promoEl, {
            interval: 5000, // 5s entre slides
            ride: 'carousel',
            pause: 'hover', // pausa ao passar o mouse
            touch: true
        });
    }
});
