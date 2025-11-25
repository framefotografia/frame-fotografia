// Configuração do carrossel de galeria
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.gallery-slider');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    const dotsContainer = document.querySelector('.gallery-dots');
    
    // Se não existir carrossel na página, não inicializar
    if (!slider) return;
    
    // Array com URLs das imagens na pasta images/gallery/
    const images = [
        'images/gallery/foto1.jpg',
        'images/gallery/foto2.jpg',
        'images/gallery/foto3.jpg',
        'images/gallery/foto4.jpg',
        'images/gallery/foto5.jpg',
        'images/gallery/foto6.jpg'
    ];
    
    let currentSlide = 0;
    
    // Criar slides e dots
    images.forEach((image, index) => {
        // Criar slide
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        
        // Criar fundo desfocado
        const slideBg = document.createElement('div');
        slideBg.className = 'slide-bg';
        slideBg.style.backgroundImage = `url(${image})`;
        
        // Criar imagem principal
        const slideImg = document.createElement('div');
        slideImg.className = 'slide-img';
        slideImg.style.backgroundImage = `url(${image})`;
        
        // Adicionar elementos ao slide
        slide.appendChild(slideBg);
        slide.appendChild(slideImg);
        slider.appendChild(slide);
        
        // Criar dot
        const dot = document.createElement('div');
        dot.className = 'gallery-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Função para ir para um slide específico
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Atualizar dots ativos
        document.querySelectorAll('.gallery-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Event listeners para os botões de navegação
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + images.length) % images.length;
        goToSlide(currentSlide);
    });
    
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % images.length;
        goToSlide(currentSlide);
    });
    
    // Auto-play do carrossel (opcional)
    let slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % images.length;
        goToSlide(currentSlide);
    }, 5000);
    
    // Pausar auto-play ao passar o mouse
    const galleryContainer = document.querySelector('.gallery-container');
    galleryContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    galleryContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % images.length;
            goToSlide(currentSlide);
        }, 5000);
    });
});

// Verificar se a imagem do hero carregou corretamente
window.addEventListener('load', function() {
    const heroSection = document.querySelector('.hero');
    // Se não existir hero na página, não fazer nada
    if (!heroSection) return;
    
    const heroImage = new Image();
    heroImage.src = 'images/hero.jpg';
    
    heroImage.onload = function() {
        console.log('Imagem do hero carregada com sucesso');
    };
    
    heroImage.onerror = function() {
        console.log('Erro ao carregar a imagem do hero. Usando fallback.');
        // Usar uma imagem de fallback do Unsplash
        document.querySelector('.hero').style.backgroundImage = 
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://source.unsplash.com/random/1920x1080/?photography,studio')";
    };
});

// Menu mobile (para futuras implementações)
function initMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.display = 'none';
    
    document.querySelector('.navbar').appendChild(menuToggle);
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Esconder menu em telas grandes, mostrar em mobile
    function handleResize() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            navLinks.style.display = 'none';
        } else {
            menuToggle.style.display = 'none';
            navLinks.style.display = 'flex';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Chamar uma vez ao carregar
}

// Inicializar menu mobile quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initMobileMenu);