/* ============================================
   DRAFTING HELPERS — Script
   ============================================ */

(function () {
    'use strict';

    // --- Mobile Navigation ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            const isOpen = navLinks.classList.toggle('is-open');
            navToggle.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('is-open');
                navToggle.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close menu on Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
                navLinks.classList.remove('is-open');
                navToggle.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                navToggle.focus();
            }
        });
    }

    // --- Smooth Scrolling (fallback for browsers without CSS scroll-behavior) ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
                var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    // --- FAQ Accordion ---
    document.querySelectorAll('.faq__question').forEach(function (button) {
        button.addEventListener('click', function () {
            var expanded = this.getAttribute('aria-expanded') === 'true';
            var answer = this.nextElementSibling;

            // Close all other items
            document.querySelectorAll('.faq__question').forEach(function (other) {
                if (other !== button) {
                    other.setAttribute('aria-expanded', 'false');
                    other.nextElementSibling.hidden = true;
                }
            });

            // Toggle current item
            this.setAttribute('aria-expanded', !expanded);
            answer.hidden = expanded;
        });
    });

    // --- Contact Form Handling ---
    var contactForm = document.getElementById('contactForm');
    var formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var formData = new FormData(contactForm);

            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            })
            .then(function (response) {
                if (response.ok) {
                    contactForm.hidden = true;
                    formSuccess.hidden = false;
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(function () {
                alert('Something went wrong. Please try again or email us directly.');
            });
        });
    }

    // --- Nav background on scroll ---
    var nav = document.getElementById('nav');
    if (nav) {
        var lastScroll = 0;
        window.addEventListener('scroll', function () {
            var currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                nav.style.boxShadow = '0 2px 16px rgba(0,0,0,0.2)';
            } else {
                nav.style.boxShadow = 'none';
            }
            lastScroll = currentScroll;
        }, { passive: true });
    }

})();
