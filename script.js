// ===== NAVIGATION FUNCTIONALITY =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when mobile menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('.section, .hero');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// ===== PARTICLES ANIMATION =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(108, 92, 231, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Add float animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * -500 - 500}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

createParticles();

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .timeline-item, .theory-card, .stat-card, .finding-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    statsObserver.observe(statsContainer);
}

// ===== MODAL FUNCTIONALITY =====
const modal = document.getElementById('theoryModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');
const learnMoreButtons = document.querySelectorAll('.btn-learn-more');

const theoryData = {
    political: {
        title: 'Political Conspiracies',
        content: `
            <h3>Overview</h3>
            <p>Political conspiracy theories involve narratives about secretive government operations, hidden political agendas, and covert activities by powerful elites. These theories often emerge during periods of political instability or major events.</p>
            
            <h3>Common Characteristics</h3>
            <ul>
                <li>Distrust in governmental institutions and officials</li>
                <li>Belief in secret societies controlling world events</li>
                <li>Attribution of major events to hidden causes</li>
                <li>Skepticism toward official explanations</li>
            </ul>
            
            <h3>Impact on Society</h3>
            <p>Political conspiracy theories can significantly affect democratic processes, public trust, and civic engagement. They may lead to polarization and decreased faith in institutions.</p>
            
            <h3>Research Findings</h3>
            <p>Studies show that political conspiracy beliefs are often correlated with feelings of powerlessness, lack of control, and desire for certainty in uncertain situations.</p>
        `
    },
    scientific: {
        title: 'Scientific Conspiracies',
        content: `
            <h3>Overview</h3>
            <p>Scientific conspiracy theories challenge established scientific consensus, often claiming that scientists or institutions are hiding the truth about various phenomena.</p>
            
            <h3>Common Examples</h3>
            <ul>
                <li>Climate change denial</li>
                <li>Vaccine misinformation</li>
                <li>Flat Earth theories</li>
                <li>Alternative medicine claims</li>
            </ul>
            
            <h3>Psychological Factors</h3>
            <p>These theories often stem from a fundamental misunderstanding of the scientific method, combined with distrust of scientific authorities and institutions.</p>
            
            <h3>Public Health Implications</h3>
            <p>Scientific conspiracy theories can have serious consequences, including decreased vaccination rates, rejection of medical treatments, and resistance to evidence-based policies.</p>
        `
    },
    tech: {
        title: 'Technological Conspiracies',
        content: `
            <h3>Overview</h3>
            <p>Technological conspiracy theories focus on concerns about surveillance, artificial intelligence, and the power of tech companies and governments to control information and people.</p>
            
            <h3>Common Themes</h3>
            <ul>
                <li>Mass surveillance and privacy invasion</li>
                <li>Mind control through technology</li>
                <li>Social media manipulation</li>
                <li>5G health concerns</li>
            </ul>
            
            <h3>Digital Age Challenges</h3>
            <p>The rapid advancement of technology and its integration into daily life has created legitimate concerns about privacy and control, which conspiracy theories often exploit and exaggerate.</p>
            
            <h3>Critical Thinking</h3>
            <p>While some technological concerns are valid, it's important to distinguish between evidence-based critiques and unfounded conspiracy theories.</p>
        `
    },
    economic: {
        title: 'Economic Conspiracies',
        content: `
            <h3>Overview</h3>
            <p>Economic conspiracy theories revolve around beliefs about hidden financial manipulation, secret control of monetary systems, and conspiracies by wealthy elites.</p>
            
            <h3>Common Narratives</h3>
            <ul>
                <li>Central bank conspiracies</li>
                <li>Market manipulation by elites</li>
                <li>Hidden global economic controllers</li>
                <li>Currency manipulation theories</li>
            </ul>
            
            <h3>Historical Context</h3>
            <p>Economic conspiracy theories often flourish during financial crises, recessions, or periods of economic inequality, providing simple explanations for complex economic phenomena.</p>
            
            <h3>Social Impact</h3>
            <p>These theories can affect investment decisions, trust in financial institutions, and support for economic policies, sometimes with significant real-world consequences.</p>
        `
    }
};

learnMoreButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const theory = button.getAttribute('data-theory');
        const data = theoryData[theory];
        
        modalTitle.textContent = data.title;
        modalBody.innerHTML = data.content;
        modal.style.display = 'block';
    });
});

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
        color: white;
        padding: 20px;
        border-radius: 10px;
        margin-top: 20px;
        text-align: center;
        font-weight: 600;
        animation: slideIn 0.5s ease-out;
    `;
    successMessage.textContent = '✓ Message sent successfully! We\'ll get back to you soon.';
    
    // Add animation
    const keyframes = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    if (!document.querySelector('#slideInAnimation')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'slideInAnimation';
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);
    }
    
    contactForm.appendChild(successMessage);
    contactForm.reset();
    
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
});

// ===== BACK TO TOP BUTTON =====
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== TYPING EFFECT FOR HERO SUBTITLE =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== CURSOR TRAIL EFFECT =====
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        width: 5px;
        height: 5px;
        background: rgba(108, 92, 231, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        animation: trailFade 1s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    cursorTrail.push(trail);
    
    if (cursorTrail.length > maxTrailLength) {
        const oldTrail = cursorTrail.shift();
        oldTrail.remove();
    }
    
    setTimeout(() => {
        trail.remove();
    }, 1000);
});

const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(trailStyle);

// ===== LAZY LOADING IMAGES =====
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ===== THEME ELEMENTS HOVER EFFECTS =====
document.querySelectorAll('.about-card, .theory-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===== INITIALIZE ON LOAD =====
window.addEventListener('load', () => {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Trigger any initial animations
    console.log('Website loaded successfully!');
    
    // Add subtle background animation
    const hero = document.querySelector('.hero');
    if (hero) {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 0.5) % 360;
            hero.style.background = `linear-gradient(135deg, 
                hsl(${hue}, 50%, 10%) 0%, 
                hsl(${(hue + 60) % 360}, 50%, 5%) 100%)`;
        }, 100);
    }
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Escape key closes modal
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
    
    // Home key scrolls to top
    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
    // Additional scroll operations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===== PDF VIEWER CONTROLS =====
const pdfFrame = document.getElementById('pdfFrame');
const pdfContainer = document.getElementById('pdfContainer');
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');
const fitWidthBtn = document.getElementById('fitWidth');
const fitPageBtn = document.getElementById('fitPage');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const zoomLevel = document.getElementById('zoomLevel');

let currentZoom = 100;

if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
        currentZoom += 10;
        if (currentZoom > 200) currentZoom = 200;
        updateZoom();
    });
}

if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
        currentZoom -= 10;
        if (currentZoom < 50) currentZoom = 50;
        updateZoom();
    });
}

if (fitWidthBtn) {
    fitWidthBtn.addEventListener('click', () => {
        currentZoom = 100;
        updateZoom();
        pdfContainer.scrollTop = 0;
    });
}

if (fitPageBtn) {
    fitPageBtn.addEventListener('click', () => {
        currentZoom = 100;
        updateZoom();
    });
}

function updateZoom() {
    if (pdfFrame) {
        pdfFrame.style.transform = `scale(${currentZoom / 100})`;
        pdfFrame.style.transformOrigin = 'top left';
        pdfFrame.style.width = `${10000 / currentZoom}%`;
        pdfFrame.style.height = `${10000 / currentZoom}%`;
    }
    if (zoomLevel) {
        zoomLevel.textContent = currentZoom + '%';
    }
}

// Fullscreen functionality
if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
        if (pdfContainer) {
            if (pdfContainer.requestFullscreen) {
                pdfContainer.requestFullscreen();
            } else if (pdfContainer.webkitRequestFullscreen) {
                pdfContainer.webkitRequestFullscreen();
            } else if (pdfContainer.msRequestFullscreen) {
                pdfContainer.msRequestFullscreen();
            }
        }
    });
}

// Check if PDF loaded successfully
if (pdfFrame) {
    pdfFrame.addEventListener('error', () => {
        const fallback = document.querySelector('.pdf-fallback');
        if (fallback) {
            fallback.style.display = 'block';
        }
    });
}

// Add keyboard shortcuts for PDF viewer
document.addEventListener('keydown', (e) => {
    // Only if PDF section is in view
    const paperSection = document.getElementById('paper');
    if (!paperSection) return;
    
    const rect = paperSection.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isInView) {
        if (e.key === '+' || e.key === '=') {
            e.preventDefault();
            if (zoomInBtn) zoomInBtn.click();
        } else if (e.key === '-' || e.key === '_') {
            e.preventDefault();
            if (zoomOutBtn) zoomOutBtn.click();
        } else if (e.key === '0') {
            e.preventDefault();
            currentZoom = 100;
            updateZoom();
        }
    }
});

console.log('Illumination Research Website - All systems operational! 🚀');
console.log('PDF Viewer: Ready | Use +/- keys to zoom when viewing the paper section');
