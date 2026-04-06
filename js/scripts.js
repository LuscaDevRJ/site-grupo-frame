// ==========================================
// 1. CARROSSEL DO BANNER PRINCIPAL (HERO)
// ==========================================
let slideIndex = 0;
let timer;

function showSlides() {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    if (slides.length === 0) return;

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        if (dots[i]) dots[i].classList.remove("active");
    }

    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }

    slides[slideIndex - 1].classList.add("active");
    if (dots[slideIndex - 1]) dots[slideIndex - 1].classList.add("active");

    timer = setTimeout(showSlides, 5000); 
}

function currentSlide(n) {
    clearTimeout(timer);
    slideIndex = n;
    showSlides();
}

showSlides();


// ==========================================
// LÓGICA DO FILTRO DE PORTFÓLIO
// ==========================================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.grid-item');

// Verifica se os botões existem na página antes de rodar
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            // 1. Remove a barrinha verde (classe active) de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 2. Coloca a barrinha verde só no botão que foi clicado
            button.classList.add('active');

            // 3. Descobre qual categoria o usuário escolheu (ex: 'farmacia')
            const filtroEscolhido = button.getAttribute('data-filter');

            // 4. Mostra ou esconde as fotos
            portfolioItems.forEach(item => {
                const categoriaItem = item.getAttribute('data-category');

                if (filtroEscolhido === 'all' || filtroEscolhido === categoriaItem) {
                    item.classList.remove('esconder-item'); // Mostra
                } else {
                    item.classList.add('esconder-item'); // Esconde
                }
            });
        });
    });
}

// ==========================================
// LÓGICA DO LIGHTBOX (Galeria e Produtos)
// ==========================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxLegenda = document.getElementById('lightbox-legenda');
const btnFechar = document.querySelector('.lightbox-fechar');
const btnEsq = document.querySelector('.lightbox-seta.esquerda');
const btnDir = document.querySelector('.lightbox-seta.direita');

// Seleciona os dois tipos de itens que podem abrir o lightbox
const itensGrid = document.querySelectorAll('.grid-item');
const itensProdutos = document.querySelectorAll('.foto-produto'); // Nova seleção da esteira!

let currentIndex = 0;
let fotosVisiveis = [];

if (lightbox) {
    
    // Função universal para abrir o Lightbox
    function abrirLightbox(itemClicado) {
        // 1. Descobre de onde veio o clique (Grade ou Esteira?)
        if (itemClicado.classList.contains('grid-item')) {
            // Se for da grade, navega só nas que o filtro não escondeu
            fotosVisiveis = Array.from(document.querySelectorAll('.grid-item:not(.esconder-item)'));
        } else if (itemClicado.classList.contains('foto-produto')) {
            // Se for da esteira, navega por todos os produtos da esteira
            fotosVisiveis = Array.from(document.querySelectorAll('.foto-produto'));
        }

        // 2. Acha a posição exata da foto clicada
        currentIndex = fotosVisiveis.indexOf(itemClicado);
        atualizarConteudoLightbox();
        lightbox.classList.add('ativo'); // Mostra a tela escura
    }

    // Função que troca a foto e a legenda
    function atualizarConteudoLightbox() {
        const itemAtual = fotosVisiveis[currentIndex];
        let imgSrc = '';
        let titulo = '';

        // Regra para fotos da Grade de Portfólio
        if (itemAtual.classList.contains('grid-item')) {
            imgSrc = itemAtual.querySelector('img').src;
            titulo = itemAtual.querySelector('h3').innerText;
        } 
        // Regra para fotos da Esteira de Produtos
        else if (itemAtual.classList.contains('foto-produto')) {
            imgSrc = itemAtual.src;
            titulo = itemAtual.alt; // Puxa o nome escrito no alt="Nome" do HTML
        }

        lightboxImg.src = imgSrc;
        lightboxLegenda.innerText = titulo;
    }

    // Função para fechar
    function fecharLightbox() {
        lightbox.classList.remove('ativo');
    }

    // Função para passar para o lado
    function mudarFoto(direcao) {
        currentIndex += direcao;
        if (currentIndex >= fotosVisiveis.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = fotosVisiveis.length - 1;
        atualizarConteudoLightbox();
    }

    // Coloca a ação de clique nas fotos da Grade
    itensGrid.forEach(item => {
        item.addEventListener('click', () => abrirLightbox(item));
    });

    // Coloca a ação de clique nas fotos dos Produtos
    itensProdutos.forEach(item => {
        item.style.cursor = 'pointer'; // Adiciona o dedinho de clique via JS
        item.addEventListener('click', () => abrirLightbox(item));
    });

    // Cliques nos Botões e Fundo
    btnFechar.addEventListener('click', fecharLightbox);
    btnDir.addEventListener('click', () => mudarFoto(1));
    btnEsq.addEventListener('click', () => mudarFoto(-1));
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) fecharLightbox();
    });

    // Atalhos do Teclado
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('ativo')) {
            if (e.key === 'Escape') fecharLightbox();
            if (e.key === 'ArrowRight') mudarFoto(1);
            if (e.key === 'ArrowLeft') mudarFoto(-1);
        }
    });
}

// ==========================================
// BANNER DO BLOG (Slide com Bolinhas)
// ==========================================
let slideIndexBlog = 0;
let timerBlog;

function mostrarSlideBlog(n) {
    let slides = document.querySelectorAll(".blog-slide");
    let dots = document.querySelectorAll(".blog-slider-dots .dot");
    
    // Se não tiver o banner do blog na página, o código para aqui e não dá erro
    if (slides.length === 0) return; 

    // Remove as classes ativas
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slideIndexBlog = n;
    
    // Travas para fazer o giro infinito
    if (slideIndexBlog >= slides.length) { slideIndexBlog = 0; }
    if (slideIndexBlog < 0) { slideIndexBlog = slides.length - 1; }

    // Coloca a classe ativa na foto e na bolinha correta
    slides[slideIndexBlog].classList.add("active");
    if(dots.length > 0) dots[slideIndexBlog].classList.add("active");
}

// Quando o usuário clica na bolinha
function mudarSlideBlog(n) {
    mostrarSlideBlog(n);
    resetTimerBlog(); // Pausa a rotação automática para não dar conflito
}

// Faz o slider rodar sozinho
function autoSlideBlog() {
    let slides = document.querySelectorAll(".blog-slide");
    if(slides.length > 0) {
        mostrarSlideBlog(slideIndexBlog + 1);
        timerBlog = setTimeout(autoSlideBlog, 5000); // 5000ms = 5 segundos
    }
}

// Reinicia o relógio do modo automático
function resetTimerBlog() {
    clearTimeout(timerBlog);
    timerBlog = setTimeout(autoSlideBlog, 5000);
}

// Dá o pontapé inicial assim que a página carrega
autoSlideBlog();

// ==========================================
// CARROSSÉIS DO BLOG (Loop Infinito Perfeito)
// ==========================================
const blogCarrosseis = document.querySelectorAll('.blog-carrossel-wrapper');

if (blogCarrosseis.length > 0) {
    blogCarrosseis.forEach(wrapper => {
        const track = wrapper.querySelector('.blog-carrossel-track');
        const btnEsq = wrapper.querySelector('.blog-btn-seta.esquerda');
        const btnDir = wrapper.querySelector('.blog-btn-seta.direita');

        // 1. CLONAR CARDS: Copia os cards originais para garantir que o loop 
        // nunca tenha "buracos" brancos na tela, mesmo se você colocar só 3 fotos.
        const cardsOriginais = Array.from(track.children);
        cardsOriginais.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });

        let isAnimating = false; // Trava de segurança contra "cliques duplos rápidos"

        // FUNÇÃO PARA AVANÇAR (Roda Gigante pra Direita)
        function avancarCarrossel() {
            if (isAnimating) return;
            isAnimating = true;

            const card = track.querySelector('.blog-card');
            const larguraCard = card.offsetWidth + 20; // 20 é o gap

            // Empurra a pista para a esquerda suavemente
            track.style.transition = 'transform 0.4s ease-in-out';
            track.style.transform = `translateX(-${larguraCard}px)`;

            // Quando a animação terminar (400ms depois)...
            setTimeout(() => {
                track.style.transition = 'none'; // Tira a animação
                track.appendChild(track.firstElementChild); // Pega o primeiro e joga pro final
                track.style.transform = 'translateX(0)'; // Reseta a posição da pista
                isAnimating = false;
            }, 400); 
        }

        // FUNÇÃO PARA VOLTAR (Roda Gigante pra Esquerda)
        function voltarCarrossel() {
            if (isAnimating) return;
            isAnimating = true;

            const card = track.querySelector('.blog-card');
            const larguraCard = card.offsetWidth + 20;

            // Pega o último card e joga pro começo ANTES de animar
            track.prepend(track.lastElementChild);
            
            // Joga a pista pra trás escondida (sem o cliente ver)
            track.style.transition = 'none';
            track.style.transform = `translateX(-${larguraCard}px)`;

            // Força o navegador a processar a mudança de lugar
            track.offsetHeight;

            // Anima a pista deslizando para o ponto zero
            track.style.transition = 'transform 0.4s ease-in-out';
            track.style.transform = 'translateX(0)';

            setTimeout(() => {
                isAnimating = false;
            }, 400);
        }

        // AUTO-PLAY (Roda sozinho a cada 5 segundos)
        let timerCarrossel = setInterval(avancarCarrossel, 5000);

        function resetarTimer() {
            clearInterval(timerCarrossel);
            timerCarrossel = setInterval(avancarCarrossel, 5000);
        }

        // Eventos dos Botões
        btnDir.addEventListener('click', () => {
            avancarCarrossel();
            resetarTimer();
        });

        btnEsq.addEventListener('click', () => {
            voltarCarrossel();
            resetarTimer();
        });

        // Pausa se o cliente colocar o mouse em cima para ler
        wrapper.addEventListener('mouseenter', () => clearInterval(timerCarrossel));
        wrapper.addEventListener('mouseleave', () => resetarTimer());
    });
}