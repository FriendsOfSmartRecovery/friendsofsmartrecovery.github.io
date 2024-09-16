// Array of background images
const backgroundImages = [
    'images/background/1.jpg',
    'images/background/2.jpg',
    'images/background/3.jpg',
    'images/background/4.jpg',
    'images/background/5.jpg'
];


// Function to set a random background image
function setRandomBackground() {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    const selectedImage = backgroundImages[randomIndex];
    document.body.style.backgroundImage = `url('${selectedImage}')`;
}


// Function to handle navigation and load external content
async function navigate(page) {
    // Update URL hash
    window.location.hash = page;

    // Load content from external file
    try {
        const response = await fetch(`content/${page}.html`);
        if (response.ok) {
            const html = await response.text();
            document.getElementById('content').innerHTML = html;
        } else {
            document.getElementById('content').innerHTML = '<p>Page not found.</p>';
        }
    } catch (error) {
        console.error('Error loading page:', error);
        document.getElementById('content').innerHTML = '<p>Error loading page.</p>';
    }
}


// Handle browser navigation (back/forward)
window.addEventListener('hashchange', () => {
    const page = window.location.hash.replace('#', '');
    navigate(page || 'home');
});


// Initialize page on load
document.addEventListener('DOMContentLoaded', () => {
    // Set random background image
    setRandomBackground();

    // Navigate to the current page or default to home
    const page = window.location.hash.replace('#', '');
    navigate(page || 'home');

    gsap.from('.content', {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });
});
