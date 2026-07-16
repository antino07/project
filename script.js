// Navigation Highlighting Script
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== Navigation Script Loading ===');
    
    // Get current page filename
    const currentPath = window.location.pathname;
    let currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
    // Handle home page
    if (currentPage === '' || currentPage.endsWith('/')) {
        currentPage = 'index.html';
    }
    
    console.log('Current page:', currentPage);
    
    // Find all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    console.log('Found links:', navLinks.length);
    
    // Set active class based on current page
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Remove active class from all
        link.classList.remove('active');
        
        // Add active class to current page link
        if (linkHref === currentPage) {
            link.classList.add('active');
            console.log('✓ Active link:', linkHref);
        }
    });
    
    // Add page-specific class to body for CSS targeting
    const pageClass = currentPage.replace('.html', '').replace('index', 'home');
    document.body.classList.add('page-' + pageClass);
    
    console.log('=== Navigation Script Complete ===');
    
    // Card animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate home cards
    document.querySelectorAll('.home-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});