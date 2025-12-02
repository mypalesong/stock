// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

if (hamburger && sidebar) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
                sidebar.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });

    // Close sidebar when clicking a link
    const navLinks = sidebar.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Search
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.article-card');
        cards.forEach(card => {
            const title = card.querySelector('.article-title')?.textContent.toLowerCase() || '';
            const excerpt = card.querySelector('.article-excerpt')?.textContent.toLowerCase() || '';
            const tags = card.querySelector('.article-tags')?.textContent.toLowerCase() || '';
            if (title.includes(term) || excerpt.includes(term) || tags.includes(term)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Category Filter
const categoryLinks = document.querySelectorAll('.category-link');
const articleCards = document.querySelectorAll('.article-card');

categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.getAttribute('href').replace('#', '');

        // Update active state
        categoryLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Filter articles
        articleCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'all' || cardCategory === category) {
                card.style.display = '';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.display = 'none';
            }
        });

        // Scroll to articles section
        const latestSection = document.getElementById('latest');
        if (latestSection) {
            latestSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Show All button (reset filter)
const showAllLink = document.querySelector('.nav-link[href="#latest"]');
if (showAllLink) {
    showAllLink.addEventListener('click', (e) => {
        categoryLinks.forEach(l => l.classList.remove('active'));
        articleCards.forEach(card => {
            card.style.display = '';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    });
}

// Fade in animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.article-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(card);
});
