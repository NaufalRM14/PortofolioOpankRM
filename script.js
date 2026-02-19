// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

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
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active link highlighting on scroll
const sections = document.querySelectorAll('section[id]');

function highlightActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveLink);

// Smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// Contact form handling - sends directly to Gmail
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject') ? document.getElementById('subject').value.trim() : '';
    const message = document.getElementById('message').value.trim();

    // Build subject line
    const emailSubject = subject
        ? `[Portfolio] ${subject}`
        : `[Portfolio] Pesan dari ${name}`;

    // Build body
    const emailBody =
        `Halo Naufal,\n\nSaya ${name} (${email}) ingin menghubungi Anda.\n\n${message}\n\n---\nDikirim melalui form portfolio website.`;

    // Construct mailto link to your Gmail
    const mailtoLink = `mailto:nrizqullahmadani@gmail.com`
        + `?subject=${encodeURIComponent(emailSubject)}`
        + `&body=${encodeURIComponent(emailBody)}`;

    // Open default mail client / Gmail
    window.location.href = mailtoLink;

    // Show success feedback
    const btn = document.getElementById('submitBtn');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> <span>Pesan Terkirim!</span>';
    btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
    }, 3000);
});


// Dynamic copyright year
const currentYear = new Date().getFullYear();
const copyrightElements = document.querySelectorAll('.footer-copyright p');
copyrightElements.forEach(element => {
    element.innerHTML = element.innerHTML.replace('2026', currentYear);
});

// Parallax effect for hero orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');

    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.2);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

console.log('%c✨ Portfolio Website by Naufal Rizqullah Madani ✨', 'color: #8B5CF6; font-size: 16px; font-weight: bold;');
console.log('%cDigital Creator | Developer | Designer', 'color: #6366F1; font-size: 12px;');

// Certificate Modal Functions
function openCertModal(imgSrc) {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certModalImg');
    modal.style.display = 'block';
    modalImg.src = imgSrc;
}

function closeCertModal() {
    const modal = document.getElementById('certModal');
    modal.style.display = 'none';
}

// Close modal on ESC key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeCertModal();
    }
});
