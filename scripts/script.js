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

// ========================================
// SISTEMA DE TRADUÇÃO
// ========================================

let translations = {};

// Traduções inline (fallback para quando estiver abrindo via file:// e o fetch falhar por CORS)
const INLINE_TRANSLATIONS = {
    'pt-br': {
        'nav-home': 'Início',
        'nav-wiki': 'Wiki',
        'nav-equipment': 'Equipamentos',
        'nav-queues': 'Filas',
        'nav-updates': 'Atualizações',
        'hero-title': 'Bem-vindo ao Guia Completo de Top Heroes',
        'hero-description': 'Descubra todos os segredos, estratégias e dicas para dominar o mundo de Top Heroes. Desde informações sobre heróis e itens até as melhores filas.',
        'btn-explore': 'Explorar Wiki',
        'btn-queues': 'Ver Filas',
        'features-title': 'Recursos do Guia',
        'feature-wiki-title': 'Wiki Completa',
        'feature-wiki-desc': 'Informações detalhadas sobre heróis, itens, habilidades e onde conseguir cada recurso do jogo.',
        'feature-wiki-link': 'Acessar Wiki →',
        'feature-equip-title': 'Guia de Equipamentos',
        'feature-equip-desc': 'Descubra as melhores builds e equipamentos para cada herói, otimizando seu poder de combate.',
        'feature-equip-link': 'Ver Equipamentos →',
        'feature-queues-title': 'Formações de Filas',
        'feature-queues-desc': 'Estratégias e combinações de heróis para criar as filas mais poderosas e eficazes.',
        'feature-queues-link': 'Ver Filas →',
        'news-title': 'Últimas Atualizações',
        'btn-all-updates': 'Ver Todas as Atualizações',
        'footer-brand': 'Top Heroes Guide',
        'footer-tagline': 'O guia mais completo para dominar Top Heroes',
        'footer-nav': 'Navegação',
        'footer-contact': 'Contato',
        'page-equipment-title': 'Recomendações de Equipamentos',
        'page-equipment-subtitle': 'Os melhores sets de equipamentos para cada herói',
        'equipment-disclaimer': '⚠️ Aviso: As informações estão sujeitas a alterações a qualquer momento. Os resultados individuais podem diferir. Realize seus próprios testes para confirmar o desempenho sob suas condições pessoais.',
        'league-title': '🛡️ EQUIPAMENTOS RECOMENDADOS - LEAGUE',
        'league-subtitle': 'Equipamentos recomendados para heróis da facção League',
        'nature-title': '🌿 EQUIPAMENTOS RECOMENDADOS - NATURE',
        'nature-subtitle': 'Equipamentos recomendados para heróis da facção Nature',
        'horde-title': '🔥 EQUIPAMENTOS RECOMENDADOS - HORDE',
        'horde-subtitle': 'Equipamentos recomendados para heróis da facção Horde',
        'alternative-legend': 'ℹ️ Legenda: Heróis marcados com ⚡ no canto superior direito são Sugestões Alternativas para o set',
        'glory-knight-bonus': 'Ataque do Equipamento +40%\nHP do Equipamento +80%\nAmplificar Dano da Habilidade +8%',
        'fury-blood-bonus': 'HP do Equipamento +160%\nRedução de Dano +6%',
        'titan-bonus': 'Ataque do Equipamento +80%\nAumento de Dano +6%',
        'desc-skill-amplify': 'Amplificar dano da habilidade > bônus de ataque fixo.',
        'desc-survival': 'Sobrevivência extra.',
        'desc-burst-survival': 'Amplificar dano da habilidade > bônus de ataque fixo. HP aumentado ajuda na sobrevivência.',
        'desc-nature-dps': 'Dará DPS extra contra Nature, mas fraco contra Horde e League.',
        'alt-legend': '🔄 PODE USAR QUALQUER COISA',
        'main-suggestion-title': '💡 SUGESTÃO PRINCIPAL',
        'main-suggestion-desc': 'Para performance PVP otimizada: Coloque toda a equipe em Blood. Isso torna sua equipe mais resistente. A maioria dos heróis Nature usa habilidades que escalam com HP: cura, escudos e estatísticas herdadas. Mais HP aumenta tudo isso de uma vez, que é a ideia principal por trás das equipes Nature: sobreviver mais tempo empilhando saúde.',
        'tidecaller-titan': 'Titan: Aumenta tanto sua cura quanto dano pessoal.',
        'tidecaller-knight': 'Knight: Escolha mais segura, forte equilíbrio de defesa e consistência.',
        'tidecaller-blood': 'Blood: Aumenta sobrevivência e fortalece seu escudo Monk, permitindo que ela aguente mais ataques.',
        'nezha-titan': 'Titan: Pode ter melhor performance em PVE.',
        'nezha-knight': 'Knight: Bom quando atuando como tanque de linha média 3º.',
        'nezha-blood': 'Blood: Preferível se ele estiver na linha de frente em PVP.',
        'wukong-titan': 'Titan: Linha de trás ou meio. Linha de frente não é tão recomendada.',
        'wukong-knight': 'Knight: Linha de frente recomendada.',
        'wukong-blood': 'Blood: Linha de frente se você precisar de sobrevivência extra.',
        // Filas (Queues) page
        'queues-page-title': 'Guia de Filas',
        'queues-page-subtitle': 'Construa suas filas com 6 heróis, 3 relíquias e componentes adicionais',
        'meta-league-title': '📚 Meta Atual - League',
        'meta-league-intro': 'As composições abaixo mostram a progressão ideal de heróis League durante o jogo. Mantenha 6 heróis da mesma facção para ativar os bônus máximos de Tier 3 (+35% Ataque e HP + redução de dano de facções específicas).',
        'meta-league-progress-title': '📊 Progressão da Meta',
        'meta-league-progress': '<strong>Early → Mid:</strong> Adjudicator entra na frente como tanque, Secret Keeper vai para FRONT, e Paragon substitui Bard no BACK. Pyromancer e Astrologer se mantêm no MID.<br><br><strong>Mid → End:</strong> Rose Princess substitui Secret Keeper na frente ao lado de Adjudicator (dupla tank). Bishop entra no MID com Nun. Bard retorna ao BACK junto com Paragon, formando a composição final meta com todos os heróis míticos e lendários.',
        'meta-nature-title': '📚 Meta Atual - Nature',
        'meta-nature-intro': 'Composições ideais para progressão com heróis Nature. Mantenha 6 heróis da mesma facção para bônus máximos.',
        'meta-nature-progress-title': '📊 Progressão da Meta Nature',
        'meta-nature-progress': '<strong>Early → Mid:</strong> Ne Zha e Monk entram na frente substituindo Treeguard e Sage. Sage e Tidecaller vão para o MID substituindo Windwalker e Pixie. Pixie vai para BACK com Forest Maiden substituindo Druid.<br><br><strong>Mid → End:</strong> Em avaliação: a fila End Game de Nature ainda não está definida no momento.',
        'meta-horde-title': '📚 Meta Atual - Horde',
        'meta-horde-intro': 'Composições ideais para progressão com heróis Horde. Mantenha 6 heróis da mesma facção para bônus máximos.',
        'meta-horde-progress-title': '📊 Progressão da Meta Horde',
        'meta-horde-progress': '<strong>Early → Mid:</strong> Desert Prince entra na frente substituindo Swordmaster. Storm Maiden substitui Warlock no MID. Soulmancer e Shaman se mantêm no BACK.<br><br><strong>Mid → End:</strong> Beastmaster substitui Barbarian na frente. Wukong substitui Wilderness Hunter no MID junto com Storm Maiden. Witch substitui Shaman no BACK, mantendo Soulmancer.',
        'faction-aura-title': '💎 Bônus de Facção (Faction Aura)',
        'faction-aura-intro': 'Quando você coloca heróis da mesma facção em sua fila, eles recebem bônus especiais. Quanto mais heróis da mesma facção (mínimo 4 Lendários ou superior), maiores os benefícios! ',
        'faction-aura-note-title': '⚠️ Nota Importante',
        'faction-aura-note': 'Os bônus de facção também recebem capacidades aprimoradas de countering durante a temporada. <strong>Esta aura só afeta heróis na sua fila atual.</strong>',
        'faction-tier1-title': 'Tier 1: 4 Heróis Lendários da Mesma Facção',
        'faction-tier1-requirement': '<strong>Requisito:</strong> Implantar 4 heróis Lendários (ou raridade superior) da mesma facção',
        'faction-tier1-list': '<li>Ataque da Fila +15%</li>\n<li>HP da Fila +15%</li>\n<li>A facção com maior número de heróis reduz o dano de counter +5%</li>',
        'faction-tier2-title': 'Tier 2: 5 Heróis Lendários da Mesma Facção',
        'faction-tier2-requirement': '<strong>Requisito:</strong> Implantar 5 heróis Lendários (ou raridade superior) da mesma facção',
        'faction-tier2-list': '<li>Ataque da Fila +25%</li>\n<li>HP da Fila +25%</li>\n<li>A facção com maior número de heróis reduz o dano de counter +10%</li>',
        'faction-tier3-title': 'Tier 3: 6 Heróis Lendários da Mesma Facção',
        'faction-tier3-requirement': '<strong>Requisito:</strong> Implantar 6 heróis Lendários (ou raridade superior) da mesma facção',
        'faction-tier3-list': '<li>Ataque da Fila +35%</li>\n<li>HP da Fila +35%</li>\n<li>League reduz dano recebido de Nature +20%</li>\n<li>Nature reduz dano recebido de Horde +20%</li>\n<li>Horde reduz dano recebido de League +20%</li>'
    },
    'en-us': {
        'nav-home': 'Home',
        'nav-wiki': 'Wiki',
        'nav-equipment': 'Gear',
        'nav-queues': 'Queues',
        'nav-updates': 'Updates',
        'hero-title': 'Welcome to the Complete Top Heroes Guide',
        'hero-description': 'Discover all the secrets, strategies and tips to master the world of Top Heroes. From hero and item information to the best queues.',
        'btn-explore': 'Explore Wiki',
        'btn-queues': 'View Queues',
        'features-title': 'Guide Features',
        'feature-wiki-title': 'Complete Wiki',
        'feature-wiki-desc': 'Detailed information about heroes, items, abilities and where to get each game resource.',
        'feature-wiki-link': 'Access Wiki →',
        'feature-equip-title': 'Gear Guide',
        'feature-equip-desc': 'Discover the best builds and gear for each hero, optimizing your combat power.',
        'feature-equip-link': 'View Gear →',
        'feature-queues-title': 'Queue Formations',
        'feature-queues-desc': 'Strategies and hero combinations to create the most powerful and effective queues.',
        'feature-queues-link': 'View Queues →',
        'news-title': 'Latest Updates',
        'btn-all-updates': 'View All Updates',
        'footer-brand': 'Top Heroes Guide',
        'footer-tagline': 'The most complete guide to master Top Heroes',
        'footer-nav': 'Navigation',
        'footer-contact': 'Contact',
        'page-equipment-title': 'Gear Recommendations',
        'page-equipment-subtitle': 'The best gear sets for each hero',
        'equipment-disclaimer': '⚠️ Warning: Information is subject to change at any time. Individual results may vary. Perform your own tests to confirm performance under your personal conditions.',
        'league-title': '🛡️ RECOMMENDED GEAR - LEAGUE',
        'league-subtitle': 'Recommended gear for League faction heroes',
        'nature-title': '🌿 RECOMMENDED GEAR - NATURE',
        'nature-subtitle': 'Recommended gear for Nature faction heroes',
        'horde-title': '🔥 RECOMMENDED GEAR - HORDE',
        'horde-subtitle': 'Recommended gear for Horde faction heroes',
        'alternative-legend': 'ℹ️ Legend: Heroes marked with ⚡ in the upper right corner are Alternative Suggestions for the set',
        'glory-knight-bonus': 'Equipment Attack +40%\nEquipment HP +80%\nSkill Damage Amplify +8%',
        'fury-blood-bonus': 'Equipment HP +160%\nDamage Reduction +6%',
        'titan-bonus': 'Equipment Attack +80%\nDamage Increase +6%',
        'desc-skill-amplify': 'Skill damage amplification > fixed attack bonus.',
        'desc-survival': 'Extra survival.',
        'desc-burst-survival': 'Skill damage amplification > fixed attack bonus. Increased HP helps survival.',
        'desc-nature-dps': 'Will give extra DPS against Nature, but weak against Horde and League.',
        'alt-legend': '🔄 CAN USE ANYTHING',
        'main-suggestion-title': '💡 MAIN SUGGESTION',
        'main-suggestion-desc': 'For optimized PvP performance: Put the whole team in Blood. This makes your team tankier. Most Nature heroes use HP-scaling abilities: healing, shields, and inherited stats. More HP boosts all of these at once, which is the main idea behind Nature teams: survive longer by stacking health.',
        'tidecaller-titan': 'Titan: Increases both your healing and personal damage.',
        'tidecaller-knight': 'Knight: Safer choice, strong balance of defense and consistency.',
        'tidecaller-blood': 'Blood: Increases survivability and strengthens Monk’s shield, letting her endure more hits.',
        'nezha-titan': 'Titan: May perform better in PvE.',
        'nezha-knight': 'Knight: Good when acting as 3rd midline tank.',
        'nezha-blood': 'Blood: Preferable if he is on the front line in PvP.',
        'wukong-titan': 'Titan: Back or middle line. Front line is not recommended.',
        'wukong-knight': 'Knight: Front line recommended.',
        'wukong-blood': 'Blood: Front line if you need extra survivability.',
        // Queues page
        'queues-page-title': 'Queues Guide',
        'queues-page-subtitle': 'Build your queues with 6 heroes, 3 relics, and extra components',
        'meta-league-title': '📚 Current Meta - League',
        'meta-league-intro': 'The compositions below show the ideal progression for League heroes throughout the game. Keep 6 heroes from the same faction to activate the maximum Tier 3 bonuses (+35% Attack and HP + reduced damage from specific counters).',
        'meta-league-progress-title': '📊 Meta Progression',
        'meta-league-progress': '<strong>Early → Mid:</strong> Adjudicator enters FRONT as tank, Secret Keeper to FRONT, and Paragon replaces Bard at BACK. Pyromancer and Astrologer stay MID.<br><br><strong>Mid → End:</strong> Rose Princess replaces Secret Keeper at FRONT alongside Adjudicator (double tank). Bishop joins MID with Nun. Bard returns to BACK with Paragon, forming the final meta composition.',
        'meta-nature-title': '📚 Current Meta - Nature',
        'meta-nature-intro': 'Ideal compositions for progression with Nature heroes. Keep 6 heroes from the same faction for maximum bonuses.',
        'meta-nature-progress-title': '📊 Nature Meta Progression',
        'meta-nature-progress': '<strong>Early → Mid:</strong> Ne Zha and Monk enter FRONT replacing Treeguard and Sage. Sage and Tidecaller move to MID replacing Windwalker and Pixie. Pixie goes to BACK with Forest Maiden replacing Druid.<br><br><strong>Mid → End:</strong> Under review: the Nature End Game queue is not defined yet.',
        'meta-horde-title': '📚 Current Meta - Horde',
        'meta-horde-intro': 'Ideal compositions for progression with Horde heroes. Keep 6 heroes from the same faction for maximum bonuses.',
        'meta-horde-progress-title': '📊 Horde Meta Progression',
        'meta-horde-progress': '<strong>Early → Mid:</strong> Desert Prince moves to FRONT replacing Swordmaster. Storm Maiden replaces Warlock at MID. Soulmancer and Shaman remain at BACK.<br><br><strong>Mid → End:</strong> Beastmaster replaces Barbarian at FRONT. Wukong replaces Wilderness Hunter at MID alongside Storm Maiden. Witch replaces Shaman at BACK, keeping Soulmancer.',
        'faction-aura-title': '💎 Faction Aura Bonuses',
        'faction-aura-intro': 'When you place heroes from the same faction in your queue, they receive special bonuses. The more heroes from the same faction (minimum 4 Legendary or higher), the greater the benefits!',
        'faction-aura-note-title': '⚠️ Important Note',
        'faction-aura-note': 'Faction bonuses also gain enhanced countering capabilities during the season. <strong>This aura only affects heroes in your current queue.</strong>',
        'faction-tier1-title': 'Tier 1: 4 Legendary Heroes from the Same Faction',
        'faction-tier1-requirement': '<strong>Requirement:</strong> Deploying 4 Legendary heroes (or better rarity) from the same faction',
        'faction-tier1-list': '<li>Queue Attack +15%</li>\n<li>Queue HP +15%</li>\n<li>Faction with the highest hero count reduces counter damage +5%</li>',
        'faction-tier2-title': 'Tier 2: 5 Legendary Heroes from the Same Faction',
        'faction-tier2-requirement': '<strong>Requirement:</strong> Deploying 5 Legendary heroes (or better rarity) from the same faction',
        'faction-tier2-list': '<li>Queue Attack +25%</li>\n<li>Queue HP +25%</li>\n<li>Faction with the highest hero count reduces counter damage +10%</li>',
        'faction-tier3-title': 'Tier 3: 6 Legendary Heroes from the Same Faction',
        'faction-tier3-requirement': '<strong>Requirement:</strong> Deploying 6 Legendary heroes (or better rarity) from the same faction',
        'faction-tier3-list': '<li>Queue Attack +35%</li>\n<li>Queue HP +35%</li>\n<li>League takes 20% less damage from Nature</li>\n<li>Nature takes 20% less damage from Horde</li>\n<li>Horde takes 20% less damage from League</li>'
    }
};

// Função para carregar traduções do JSON
async function loadTranslations() {
    // Determina o caminho correto baseado na localização da página
    let translationsPath = '../scripts/translations.json';
    
    // Se estiver na raiz, usa o caminho diferente
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        translationsPath = 'scripts/translations.json';
    }
    
    // Se estiver rodando via file:// use o fallback inline para evitar CORS
    if (window.location.protocol === 'file:') {
        translations = INLINE_TRANSLATIONS;
        console.log('Using inline translations (file protocol)');
        return;
    }

    try {
        const response = await fetch(translationsPath);
        if (response.ok) {
            translations = await response.json();
            console.log('Translations loaded successfully');
        } else {
            console.error('Failed to load translations:', response.status);
            translations = INLINE_TRANSLATIONS;
        }
    } catch (error) {
        console.warn('Error loading translations, using inline fallback:', error);
        translations = INLINE_TRANSLATIONS;
    }
}

// Função para obter o idioma atual
function getCurrentLanguage() {
    return localStorage.getItem('lang') || 'pt-br';
}

// Função para definir o idioma
function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    applyTranslations(lang);
    updateLangButtons(lang);
}

// Função para aplicar as traduções
function applyTranslations(lang) {
    if (!translations[lang]) {
        console.error('Translations not loaded for language:', lang);
        console.log('Available translations:', Object.keys(translations));
        return;
    }
    
    console.log('Applying translations for language:', lang);
    const keys = Object.keys(translations[lang]);
    console.log('Found translation keys:', keys.length);
    
    keys.forEach(key => {
        const elements = document.querySelectorAll(`[data-translate="${key}"]`);
        console.log(`Key "${key}": found ${elements.length} elements`);
        
        elements.forEach(el => {
            const value = translations[lang][key] ?? '';
            // Se o valor contém tags HTML (<...>) ou quebras de linha, usar innerHTML
            if (/[<>]/.test(value) || value.includes('\n')) {
                el.innerHTML = value.replace(/\n/g, '<br>');
            } else {
                el.textContent = value;
            }
        });
    });
}

// Função para atualizar os botões de idioma
function updateLangButtons(lang) {
    const ptBtn = document.getElementById('lang-pt');
    const enBtn = document.getElementById('lang-en');
    
    if (ptBtn && enBtn) {
        ptBtn.classList.toggle('active', lang === 'pt-br');
        enBtn.classList.toggle('active', lang === 'en-us');
    }
}

// Função para mudar o idioma
function changeLanguage(lang) {
    console.log('Changing language to:', lang);
    setLanguage(lang);
}

// Aplicar traduções ao carregar a página
document.addEventListener('DOMContentLoaded', async function() {
    await loadTranslations();
    const currentLang = getCurrentLanguage();
    applyTranslations(currentLang);
    updateLangButtons(currentLang);
});
