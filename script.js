// Smooth scrolling for navigation links
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

// Form submission handler
function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Get form values
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const school = form.querySelector('select').value;
    const teamName = form.querySelectorAll('input[type="text"]')[1].value;

    // Validate email
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert('Please enter a valid email address');
        return;
    }

    // Show success message
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.textContent;

    submitButton.textContent = '✓ Registration Successful!';
    submitButton.style.background = 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)';

    // Log registration data (in a real app, this would be sent to a server)
    console.log('Registration submitted:', {
        name,
        email,
        school,
        teamName: teamName || 'Individual'
    });

    // Reset form after 2 seconds
    setTimeout(() => {
        form.reset();
        submitButton.textContent = originalText;
        submitButton.style.background = '';
    }, 2000);
}

// Add scroll animation effects
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all about cards and track cards
document.querySelectorAll('.about-card, .track-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            link.style.borderBottom = 'none';

            if (link.getAttribute('href').slice(1) === current) {
                link.style.color = 'var(--princeton-orange)';
                link.style.borderBottom = '2px solid var(--princeton-orange)';
            }
        });
    });
}

updateActiveNavLink();

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
const heroOrbs = document.querySelectorAll('.gradient-orb');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition < hero.clientHeight) {
        heroOrbs.forEach((orb, index) => {
            const speed = 0.5 + (index * 0.1);
            orb.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    }
});

// Counter animation for stats (if needed in future)
function animateCounter(element, target, duration = 1000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals/popups if needed
    }
});

console.log('🧠 Claude Hackathon website loaded!');
console.log('🏛️ Go Tigers!');
