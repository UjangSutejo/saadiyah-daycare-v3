// ===== MOBILE MENU TOGGLE =====
const menuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');

        // Toggle Icon
        const icon = menuBtn.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ===== GSAP SCROLL ANIMATIONS FOR HEADER =====
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Only run GSAP animations on tablet/desktop (not on mobile phones)
if (window.matchMedia('(min-width: 769px)').matches) {
    // Header shrink animation on scroll
    gsap.to('.header', {
        maxWidth: '600px',
        padding: '5px 10px',
        scrollTrigger: {
            trigger: 'body',
            start: '200px top',
            end: '700px top',
            scrub: true,
            onLeaveBack: () => {
                // Force close dropdown saat scroll balik ke atas (header balik ke bentuk semula)
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    const icon = menuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });

    // Hide navigation links on scroll
    gsap.to('.nav', {
        opacity: 0,
        visibility: 'hidden',
        scale: 0.8,
        scrollTrigger: {
            trigger: 'body',
            start: '200px top',
            end: '700px top',
            scrub: true,
        }
    });

    // Hide header button on scroll
    gsap.to('.btn-header', {
        opacity: 0,
        visibility: 'hidden',
        scale: 0.8,
        scrollTrigger: {
            trigger: 'body',
            start: '200px top',
            end: '700px top',
            scrub: true,
        }
    });
} else {
    // On mobile, ensure GSAP doesn't interfere with dropdown menu
    // Clear any inline styles that might have been set
    gsap.set('.nav', { clearProps: 'all' });
    gsap.set('.btn-header', { clearProps: 'all' });
}




// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all reveal elements
// Observe generic reveal elements
document.querySelectorAll('.testimonial-card, .gallery-item').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// Observe program and facility cards (custom staggered animation)
document.querySelectorAll('.program-card, .facility-card').forEach(el => {
    // Don't add .reveal class to avoid conflict with custom animation
    observer.observe(el);
});

// ===== FORM SUBMISSION =====
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const parentName = document.getElementById('parent-name').value;
        const childName = document.getElementById('child-name').value;
        const childAge = document.getElementById('child-age').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        // Validate form
        if (!parentName || !childName || !childAge || !email || !phone) {
            alert('Mohon isi semua field yang wajib diisi!');
            return;
        }

        // Format WhatsApp Message
        const whatsappNumber = "6285285597440";
        const message = `Halo Sa'adiyah Daycare, saya ingin mendaftar:
        
*Nama Orang Tua:* ${parentName}
*Nama Anak:* ${childName}
*Usia Anak:* ${childAge} tahun
*Email:* ${email}
*Nomor Telepon:* ${phone}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Redirect to WhatsApp
        window.open(whatsappURL, '_blank');

        // Optional: Reset form
        form.reset();
    });
}

// ===== BUTTON CLICK EFFECTS =====
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});


// ===== GALLERY SCROLLING CLONE =====
const galleryTrack = document.querySelector('.gallery-track');
if (galleryTrack) {
    const firstContainer = galleryTrack.querySelector('.gallery-container');
    const secondContainer = galleryTrack.querySelectorAll('.gallery-container')[1];
    const galleryImages = firstContainer.querySelectorAll('img');

    galleryImages.forEach(img => {
        const clone = img.cloneNode(true);
        secondContainer.appendChild(clone);
    });
}

// ===== HOVER EFFECTS ON CARDS =====
document.querySelectorAll('.program-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        nav.classList.remove('active');
    }
});

// ===== LAZY LOADING SIMULATION =====
window.addEventListener('load', () => {
    document.querySelectorAll('img').forEach(img => {
        img.style.opacity = '1';
    });
});

// ===== FACILITY CARD SNEAK PEEK =====
document.querySelectorAll('.facility-card').forEach(card => {
    card.addEventListener('click', function (e) {
        let sneakPeek = this.querySelector('.facility-sneak-peek');

        if (!sneakPeek) {
            // Create sneak peek element if it doesn't exist
            sneakPeek = document.createElement('div');
            sneakPeek.className = 'facility-sneak-peek';

            const imgPath = this.getAttribute('data-image');
            const img = document.createElement('img');

            // Resolve image path correctly
            if (imgPath.startsWith('gambar/')) {
                img.src = imgPath;
            } else {
                img.src = `gambar/${imgPath}`;
            }

            img.alt = this.querySelector('h3').textContent;

            sneakPeek.appendChild(img);
            this.appendChild(sneakPeek);
        }

        const hint = this.querySelector('.facility-hint');

        if (sneakPeek.classList.contains('active')) {
            sneakPeek.classList.remove('active');
            hint.innerHTML = 'Lihat Foto <i class="fas fa-camera"></i>';
        } else {
            // Close other active sneak peeks and reset their hints
            document.querySelectorAll('.facility-card').forEach(otherCard => {
                const otherPeek = otherCard.querySelector('.facility-sneak-peek');
                const otherHint = otherCard.querySelector('.facility-hint');
                if (otherPeek && otherPeek.classList.contains('active')) {
                    otherPeek.classList.remove('active');
                    if (otherHint) otherHint.innerHTML = 'Lihat Foto <i class="fas fa-camera"></i>';
                }
            });

            setTimeout(() => {
                sneakPeek.classList.add('active');
                hint.innerHTML = 'Tutup Foto <i class="fas fa-times"></i>';
            }, 10);
        }
    });
});



// ===== FORM INPUT VALIDATION =====
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function () {
        const email = this.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && !emailRegex.test(email)) {
            this.style.borderColor = '#FF6B6B';
            this.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.1)';
        } else {
            this.style.borderColor = '#E0E0E0';
            this.style.boxShadow = 'none';
        }
    });
}

// ===== PHONE INPUT VALIDATION =====
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^\d+\-\s()]/g, '');
    });
}

// ===== NOTIFICATION BELL ANIMATION =====
const bellBtn = document.querySelector('.icon-btn:first-child');
if (bellBtn) {
    bellBtn.addEventListener('click', function () {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'pulse 0.6s ease-in-out';
        }, 10);
    });


}


// ===== RIPPLE EFFECT STYLES =====
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Sa\'adiyah Daycare Website Loaded Successfully!');

    // Add animation to hero section
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.style.animation = 'slideInLeft 0.8s ease-out';
    }
});
