// Fade-in animation when scrolling

const sections = document.querySelectorAll('.immersion-card, .content-box');

window.addEventListener('scroll', () => {

    const triggerBottom = window.innerHeight * 0.85;

    sections.forEach(section => {

        const sectionTop = section.getBoundingClientRect().top;

        if(sectionTop < triggerBottom) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }

    });

});


// Initial styles
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px)';
    section.style.transition = 'all 0.8s ease';
});

// Gallery lightbox functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const closeLightbox = document.querySelector('.close-lightbox');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const lightboxCaption = document.querySelector('.lightbox-caption');

let currentImageIndex = 0;
const images = Array.from(galleryItems).map(item => ({
    src: item.querySelector('img').src,
    alt: item.querySelector('img').alt
}));

function openLightbox(index) {
    currentImageIndex = index;
    lightbox.classList.add('active');
    updateLightboxImage();
}

function closeLightboxModal() {
    lightbox.classList.remove('active');
}

function updateLightboxImage() {
    lightboxImage.src = images[currentImageIndex].src;
    lightboxImage.alt = images[currentImageIndex].alt;
    lightboxCaption.textContent = images[currentImageIndex].alt;
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightboxImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightboxImage();
}

// Event listeners for gallery
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
});

closeLightbox.addEventListener('click', closeLightboxModal);
prevButton.addEventListener('click', prevImage);
nextButton.addEventListener('click', nextImage);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightboxModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') closeLightboxModal();
});

// Scroll progress bar (for pages with progress bar)
const progressBar = document.getElementById('scroll-progress');

if (progressBar) {
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    });
}

