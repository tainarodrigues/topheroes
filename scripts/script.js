// ========================================
// TOP HEROES - SCRIPTS COMPLETOS
// ========================================

// Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animação do hamburger
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer para animações ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos com animação
document.querySelectorAll('.feature-card, .news-card, .content-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Efeito parallax suave
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.game-character');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Função para destacar o link ativo baseado na página atual
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Primeiro, remove todos os active
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        const linkText = link.textContent.trim();
        
        // Verifica se estamos na página inicial (raiz do site)
        const isIndexPage = (currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/')) && 
                           !currentPath.includes('/wiki/') && 
                           !currentPath.includes('/pages/');
        
        // Verifica se estamos em páginas da wiki
        const isWikiPage = currentPath.includes('/wiki/') || currentPath.includes('/wiki/index.html') || 
                          currentPath.includes('/wiki/heroes.html') || currentPath.includes('/wiki/equipamentos.html') ||
                          currentPath.includes('/wiki/itens.html') || currentPath.includes('/wiki/heroes/');
        
        // Se estamos na página inicial, marca apenas "Início"
        if (isIndexPage && linkText === 'Início') {
            link.classList.add('active');
        }
        // Se estamos em páginas da wiki, marca apenas "Wiki"
        else if (isWikiPage && linkText === 'Wiki') {
            link.classList.add('active');
        }
        // Se estamos na página de equipamentos recomendados
        else if (currentPath.includes('equipamentos.html') && !currentPath.includes('wiki/') && linkText === 'Equipamentos') {
            link.classList.add('active');
        }
        // Se estamos na página de filas
        else if (currentPath.includes('filas.html') && linkText === 'Filas') {
            link.classList.add('active');
        }
        // Se estamos na página de atualizações
        else if (currentPath.includes('atualizacoes.html') && linkText === 'Atualizações') {
            link.classList.add('active');
        }
    });
}

// Chamar ao carregar a página
setActiveNavLink();
