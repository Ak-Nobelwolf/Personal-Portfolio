function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Dark mode toggle functionality
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
    if (!darkModeToggle || !darkModeToggleMobile) return; // Guard clause if elements don't exist
    
    // Check for saved user preference, first in localStorage, then in system preferences
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply saved theme on load
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Function to handle theme toggle
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    // Listen for theme toggle clicks on both buttons
    darkModeToggle.addEventListener('click', toggleTheme);
    darkModeToggleMobile.addEventListener('click', toggleTheme);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
        }
    });
}

// Initialize dark mode when DOM is loaded
document.addEventListener('DOMContentLoaded', initDarkMode);

// Contact form validation and submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    if (name.length < 2) {
        showError('nameError', 'Name must be at least 2 characters long');
        isValid = false;
    } else {
        hideError('nameError');
    }
    
    if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    } else {
        hideError('emailError');
    }
    
    if (subject.length < 3) {
        showError('subjectError', 'Subject must be at least 3 characters long');
        isValid = false;
    } else {
        hideError('subjectError');
    }
    
    if (message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters long');
        isValid = false;
    } else {
        hideError('messageError');
    }
    
    if (isValid) {
        const mailtoLink = `mailto:akshaytadakod@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoLink;
        
        showFormStatus('success', 'Thank you! Your message is being prepared. Please send it from your email client.');
        
        setTimeout(() => {
            document.getElementById('contactForm').reset();
            hideFormStatus();
        }, 5000);
    } else {
        showFormStatus('error', 'Please correct the errors before submitting');
        setTimeout(hideFormStatus, 5000);
    }
    
    return false;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function hideError(errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.classList.remove('show');
}

function showFormStatus(type, message) {
    const statusElement = document.getElementById('formStatus');
    statusElement.textContent = message;
    statusElement.className = `form-status ${type}`;
}

function hideFormStatus() {
    const statusElement = document.getElementById('formStatus');
    statusElement.className = 'form-status';
}

// Smooth scroll behavior for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.details-container, .cert-card, .project-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
});
