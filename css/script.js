// ===================================
// Mobile Menu Toggle
// ===================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Image Gallery
// ===================================
const galleryData = [
    {
        images: [
            'images/gallery/project1-1.jpg',
            'images/gallery/project1-2.jpg',
            'images/gallery/project1-3.jpg',
            'images/gallery/project1-4.jpg'
        ],
        captions: [
            'Project 1 - Image 1',
            'Project 1 - Image 2',
            'Project 1 - Image 3',
            'Project 1 - Image 4'
        ]
    },
    {
        images: [
            'images/gallery/project2-1.jpg',
            'images/gallery/project2-2.jpg',
            'images/gallery/project2-3.jpg'
        ],
        captions: [
            'Project 2 - Image 1',
            'Project 2 - Image 2',
            'Project 2 - Image 3'
        ]
    },
    {
        images: [
            'images/gallery/project3-1.jpg',
            'images/gallery/project3-2.jpg',
            'images/gallery/project3-3.jpg',
            'images/gallery/project3-4.jpg',
            'images/gallery/project3-5.jpg'
        ],
        captions: [
            'Project 3 - Image 1',
            'Project 3 - Image 2',
            'Project 3 - Image 3',
            'Project 3 - Image 4',
            'Project 3 - Image 5'
        ]
    }
];

let currentGallery = 0;
let currentImageIndex = 0;

function openGallery(galleryIndex) {
    currentGallery = galleryIndex;
    currentImageIndex = 0;
    
    const modal = document.getElementById('galleryModal');
    modal.classList.add('active');
    
    showImage(currentImageIndex);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    const gallery = galleryData[currentGallery];
    currentImageIndex += direction;
    
    // Wrap around
    if (currentImageIndex < 0) {
        currentImageIndex = gallery.images.length - 1;
    } else if (currentImageIndex >= gallery.images.length) {
        currentImageIndex = 0;
    }
    
    showImage(currentImageIndex);
}

function showImage(index) {
    const gallery = galleryData[currentGallery];
    const imgElement = document.getElementById('galleryImage');
    const captionElement = document.getElementById('galleryCaption');
    
    // Use placeholder if image doesn't exist
    imgElement.src = gallery.images[index];
    imgElement.onerror = function() {
        this.src = `https://via.placeholder.com/800x600?text=Image+${index + 1}`;
    };
    
    captionElement.textContent = `${gallery.captions[index]} (${index + 1}/${gallery.images.length})`;
}

// Close gallery on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeGallery();
    }
});

// Navigate gallery with arrow keys
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('galleryModal');
    if (modal.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});

// Close gallery when clicking outside the image
document.getElementById('galleryModal').addEventListener('click', (e) => {
    if (e.target.id === 'galleryModal') {
        closeGallery();
    }
});

// ===================================
// Contact Form Handling (if form exists)
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Show success message (you can customize this)
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// ===================================
// Scroll Animations
// ===================================
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

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.mission-card, .project-card, .team-card, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===================================
// Donate Button Actions
// ===================================
const donateButtons = document.querySelectorAll('.donate-options button');

donateButtons.forEach(button => {
    button.addEventListener('click', () => {
        // You can customize this to redirect to your payment page
        alert('You will be redirected to our secure payment partner. (This is a placeholder - add your actual payment link)');
        
        // Example: window.location.href = 'https://your-payment-link.com';
    });
});

// ===================================
// Back to Top Button (Optional)
// ===================================
// You can add a back-to-top button if needed
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
    
    document.body.appendChild(button);
}

// Initialize back to top button
createBackToTopButton();

// ===================================
// Console Welcome Message
// ===================================
console.log('%c Welcome to our NGO Website! ', 'background: #2563eb; color: white; font-size: 20px; padding: 10px;');
console.log('%c Built with ❤️ for a better tomorrow ', 'color: #10b981; font-size: 14px;');

