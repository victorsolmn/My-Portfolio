// ===========================
// Mobile Navigation Toggle
// ===========================

const hamburger = document.getElementById('hamburger');
const navMenuWrapper = document.querySelector('.nav-menu-wrapper');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenuWrapper.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenuWrapper) {
            navMenuWrapper.classList.remove('active');
        }
        if (hamburger) {
            hamburger.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// ===========================
// Smooth Scrolling
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Scroll Animations (AOS-like)
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    animateOnScroll.observe(el);
});

// ===========================
// Navigation Background on Scroll
// ===========================

const navigation = document.querySelector('.navigation');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add stronger background when scrolled
    if (currentScroll > 50) {
        navigation.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navigation.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    } else {
        navigation.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navigation.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===========================
// Active Navigation Link
// ===========================

const sections = document.querySelectorAll('section[id]');

const highlightNav = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.style.fontWeight = '600';
                navLink.style.color = 'var(--color-black)';
            } else {
                navLink.style.fontWeight = '500';
                navLink.style.color = 'var(--color-text)';
            }
        }
    });
};

window.addEventListener('scroll', highlightNav);

// ===========================
// Contact Form Handling
// ===========================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Create mailto link
        const subject = encodeURIComponent(`Contact from ${formData.firstName} ${formData.lastName}`);
        const body = encodeURIComponent(`From: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        const mailtoLink = `mailto:victorsolmn@gmail.com?subject=${subject}&body=${body}`;

        // Open email client
        window.location.href = mailtoLink;

        // Reset form
        contactForm.reset();

        // Show success message (optional)
        alert('Thank you for your message! Your email client will open to send the message.');
    });
}

// ===========================
// Parallax Effect for Hero (subtle)
// ===========================

const heroSection = document.querySelector('.hero-section');

if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
}

// ===========================
// Project Card Hover Enhancement
// ===========================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===========================
// Social Icon Hover Effects
// ===========================

const socialIcons = document.querySelectorAll('.social-icon, .social-icon-circle');

socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-2px)';
    });

    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// ===========================
// Page Load Animation
// ===========================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 50);
});

// ===========================
// Prevent layout shift
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Ensure body is visible
    document.body.style.visibility = 'visible';

    // Initialize any animations
    const elementsToAnimate = document.querySelectorAll('[data-aos]');
    elementsToAnimate.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('aos-animate');
        }
    });
});

// ===========================
// Console Message
// ===========================

console.log('%c👋 Welcome to my portfolio!', 'font-size: 18px; font-weight: bold; color: #1A1A1A;');
console.log('%cIf you have any opportunities or want to connect, feel free to reach out!', 'font-size: 14px; color: #666666;');
console.log('%c📧 victorsolmn@gmail.com', 'font-size: 14px; color: #1A1A1A; font-weight: 600;');
