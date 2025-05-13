// Update your window.onload handler
// Add this to the top of your script.js file
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.querySelector('.progress-bar');
    let progress = 0;
    
    // Preload important images
    const imagesToPreload = [
        'assest/logo.png',
        // Add paths to your most important images
    ];

    // Fast progress simulation
    const simulateProgress = () => {
        const interval = setInterval(() => {
            progress += 5;
            progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        document.body.style.overflow = 'visible';
                    }, 300);
                }, 200);
            }
        }, 20); // Faster interval
    };

    // Start loading animation immediately
    simulateProgress();

    // Optimize image loading
    window.addEventListener('load', function() {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.style.overflow = 'visible';
        }, 300);
    });
});

// Prevent scrolling while loading
document.body.style.overflow = 'hidden';
    // Navbar background change on scroll
    const navbar = document.getElementById('main-nav');
    window.addEventListener('scroll', function () {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    Array.from(navLinks.querySelectorAll('a')).forEach(link => {
      link.addEventListener('click', function () {
        if (window.innerWidth < 1200) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('open');
        }
      });
    });
    // Add this to your existing script section
    const observerGadgets = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.gadget-item').forEach((el) => {
      observerGadgets.observe(el);
    });
    // Lightbox for gallery
    // Add this to your existing script section
    const galleryImages = document.querySelectorAll('.gallery-img-wrapper');
    const showMoreGalleryBtn = document.getElementById('showMoreBtn');
    let galleryMoreShown = false;

    showMoreGalleryBtn.addEventListener('click', function () {
      const extraImages = document.querySelectorAll('.extra-img');

      if (!galleryMoreShown) {
        extraImages.forEach((img, index) => {
          img.style.display = 'block';
          setTimeout(() => {
            img.style.animation = 'fadeInUp 0.6s ease forwards';
          }, index * 100);
        });
        showMoreGalleryBtn.textContent = 'Show Less';
        galleryMoreShown = true;
      } else {
        extraImages.forEach(img => {
          img.style.animation = '';
          img.style.display = 'none';
        });
        showMoreGalleryBtn.textContent = 'Show More';
        galleryMoreShown = false;
      }
    });

    // Enhanced lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('#lightbox-img');

    galleryImages.forEach(wrapper => {
      wrapper.addEventListener('click', () => {
        const img = wrapper.querySelector('.gallery-img');
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
      });
    });
    // Show More button for games
    const gamesShowMoreBtn = document.getElementById('gamesShowMoreBtn');
    const extraGames = document.querySelectorAll('.extra-game');
    let gamesMoreShown = false;

    gamesShowMoreBtn.addEventListener('click', function () {
      if (!gamesMoreShown) {
        extraGames.forEach((game, index) => {
          game.style.display = 'block';
          setTimeout(() => {
            game.classList.add('visible');
          }, index * 100);
        });
        gamesShowMoreBtn.textContent = 'Show Less';
        gamesMoreShown = true;
      } else {
        extraGames.forEach(game => {
          game.classList.remove('visible');
          setTimeout(() => {
            game.style.display = 'none';
          }, 500);
        });
        gamesShowMoreBtn.textContent = 'Show More Games';
        gamesMoreShown = false;
      }
    });
    // Testimonials carousel
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialBtns = document.querySelectorAll('.testimonial-nav-btn');
    let testimonialIndex = 0;
    function showTestimonial(idx) {
      testimonials.forEach((t, i) => t.classList.toggle('active', i === idx));
      testimonialBtns.forEach((b, i) => b.classList.toggle('active', i === idx));
    }
    testimonialBtns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        testimonialIndex = i;
        showTestimonial(i);
      });
    });
    setInterval(() => {
      testimonialIndex = (testimonialIndex + 1) % testimonials.length;
      showTestimonial(testimonialIndex);
    }, 6000);

    // Add to your existing script section
    document.querySelectorAll('.game-card').forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      card.addEventListener('mouseenter', (e) => {
        const bounds = card.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;

        card.style.transform = `
            perspective(1000px) 
            rotateY(${(mouseX - bounds.width / 2) / 20}deg) 
            rotateX(${-(mouseY - bounds.height / 2) / 20}deg) 
            translateY(-10px)
        `;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
      });
    });

    // Add this to your existing script section
    document.querySelectorAll('.game-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPerc = x / rect.width;
        const yPerc = y / rect.height;

        const rotateY = (xPerc - 0.5) * 20;
        const rotateX = (0.5 - yPerc) * 20;

        card.style.transform = `
      scale(1.05)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-10px)
    `;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1) rotateX(0) rotateY(0) translateY(0)';
      });
    });
    // Animated particles in hero
    const canvas = document.querySelector('.particles');
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = document.querySelector('.hero').offsetHeight;
    }
    function Particle() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.r = 1 + Math.random() * 2;
      this.dx = (Math.random() - 0.5) * 0.5;
      this.dy = (Math.random() - 0.5) * 0.5;
      this.c = Math.random() > 0.5 ? 'rgba(255, 183, 0, 0.7)' : 'rgba(0, 89, 255, 0.7)';
    }
    function animateParticles() {
      ctx.clearRect(0, 0, w, h);
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.c;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
      }
      requestAnimationFrame(animateParticles);
    }
    function initParticles() {
      particles = [];
      for (let i = 0; i < 48; i++) particles.push(new Particle());
    }
    window.addEventListener('resize', () => { resize(); initParticles(); });
    window.onload = () => {
      resize();
      initParticles();
      animateParticles();
    };

    // Contact Us form (demo, just show success)
    // Replace the contact form submission code
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = this;
    const submitBtn = form.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('contact-success');
    
    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            successMsg.style.display = 'block';
            form.reset();
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3500);
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        alert('Failed to send message. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
});

// Replace the feedback form submission code
document.getElementById('feedbackForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    if (!document.getElementById('feedback-rating').value) {
        alert('Please select a rating!');
        return;
    }
    
    const form = this;
    const submitBtn = form.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('feedback-success');
    
    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            successMsg.style.display = 'block';
            form.reset();
            selectedRating = 0;
            stars.forEach(s => {
                s.classList.remove('selected');
                s.classList.remove('hovered');
            });
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3500);
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        alert('Failed to send feedback. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Feedback';
    }
});

    // Feedback Form (star rating)
    // Replace the existing star rating JavaScript with this updated version
// Replace the existing star rating JavaScript
const stars = document.querySelectorAll('#feedbackStars .star');
const ratingInput = document.getElementById('feedback-rating');
let selectedRating = 0;

stars.forEach((star) => {
    star.addEventListener('mouseenter', (e) => {
        const value = parseFloat(e.target.dataset.value);
        stars.forEach((s) => {
            const starValue = parseFloat(s.dataset.value);
            if (starValue <= value) {
                s.classList.add('hovered');
            } else {
                s.classList.remove('hovered');
            }
        });
    });

    star.addEventListener('mouseleave', () => {
        stars.forEach((s) => {
            s.classList.remove('hovered');
        });
    });

    star.addEventListener('click', (e) => {
        const value = parseFloat(e.target.dataset.value);
        selectedRating = value;
        ratingInput.value = value;
        
        stars.forEach((s) => {
            const starValue = parseFloat(s.dataset.value);
            if (starValue <= value) {
                s.classList.add('selected');
            } else {
                s.classList.remove('selected');
            }
        });
    });
});

// document.getElementById('feedbackForm').addEventListener('submit', function(e) {
//     e.preventDefault();
//     if (!ratingInput.value) {
//         alert('Please select a rating!');
//         return;
//     }
//     document.getElementById('feedback-success').style.display = 'block';
//     setTimeout(() => {
//         document.getElementById('feedback-success').style.display = 'none';
//     }, 3500);
//     this.reset();
//     selectedRating = 0;
//     stars.forEach(s => {
//         s.classList.remove('selected');
//         s.classList.remove('hovered');
//     });
// });
// Add this to your existing script.js
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});