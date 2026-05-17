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
document.querySelectorAll('.gallery[data-gallery-source]').forEach(gallery => {
    const sourceId = gallery.dataset.gallerySource;
    const source = document.getElementById(sourceId);

    if (!source) return;

    try {
        const images = JSON.parse(source.textContent);

        gallery.innerHTML = images.map((image, index) => `
            <div class="gallery-item" data-gallery="${index}">
                <img src="${image.src}" alt="${image.alt}" class="gallery-thumbnail">
                <p class="gallery-caption">${image.alt}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error(`Gallery image list "${sourceId}" is not valid JSON.`, error);
    }
});

const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');

if (galleryItems.length > 0 && lightbox) {
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const closeLightbox = lightbox.querySelector('.close-lightbox');
    const prevButton = lightbox.querySelector('.prev-button');
    const nextButton = lightbox.querySelector('.next-button');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');

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

    if (closeLightbox) closeLightbox.addEventListener('click', closeLightboxModal);
    if (prevButton) prevButton.addEventListener('click', prevImage);
    if (nextButton) nextButton.addEventListener('click', nextImage);

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
}

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const darkModeToggle = document.querySelector('.dark-mode-toggle');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
}

if (darkModeToggle) {
    const enableDarkMode = () => {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀';
        localStorage.setItem('darkMode', 'enabled');
    };

    const disableDarkMode = () => {
        document.body.classList.remove('dark-mode');
        darkModeToggle.textContent = '🌙';
        localStorage.setItem('darkMode', 'disabled');
    };

    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        enableDarkMode();
    }

    darkModeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
}

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

