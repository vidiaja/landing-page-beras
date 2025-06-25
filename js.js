// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission
const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });
    
    if (response.ok) {
        alert('Pesan terkirim!');
        form.reset();
    } else {
        alert('Gagal mengirim pesan');
    }
});

// Scroll animation
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .product-card, .testimonial-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
document.querySelectorAll('.feature-card, .product-card, .testimonial-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Payment Modal
const paymentModal = document.getElementById('paymentModal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Open payment modal when checkout button is clicked
checkoutBtn.addEventListener('click', function() {
    cartModal.style.display = 'none';
    paymentModal.style.display = 'block';
});

// Copy button functionality
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', function() {
        const textToCopy = this.getAttribute('data-text');
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Change button text temporarily
            const originalText = this.textContent;
            this.textContent = 'Tersalin!';
            this.style.backgroundColor = 'var(--primary)';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = 'var(--accent)';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });
});

// Add this to your existing window click event listener
window.addEventListener('click', function(event) {
    if (event.target === paymentModal) {
        paymentModal.style.display = 'none';
    }
    // ... existing code ...
});

// Add this to your existing close modal functionality
document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', function() {
        paymentModal.style.display = 'none';
        // ... existing code ...
    });
});

// Untuk semua tombol dengan class 'open-payment-modal'
document.querySelectorAll('.open-payment-modal').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('paymentModal').style.display = 'block';
    });
});

// Script untuk menutup modal (pastikan sudah ada)
document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('paymentModal').style.display = 'none';
});
window.onclick = function(event) {
    var modal = document.getElementById('paymentModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Add this to your existing script.js
function redirectToPayment(productName, productPrice) {
    // Save product data to localStorage
    localStorage.setItem('selectedProduct', JSON.stringify({
        name: productName,
        price: productPrice,
        timestamp: new Date().getTime()
    }));
    
    // Redirect to payment page
    window.location.href = 'payment.html';
}

// On payment page load (add to script.js)
if (window.location.pathname.includes('payment.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        // Copy button functionality
        document.querySelectorAll('.copy-btn').forEach(button => {
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const textToCopy = document.getElementById(targetId).textContent;
                
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalText = this.textContent;
                    this.textContent = 'Tersalin!';
                    this.style.backgroundColor = 'var(--primary)';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.backgroundColor = 'var(--accent)';
                    }, 2000);
                });
            });
        });
        
        // Check if coming from product selection
        const productData = JSON.parse(localStorage.getItem('selectedProduct'));
        if (productData) {
            // You can display the product info if needed
            console.log('Pembayaran untuk:', productData.name, 'Harga:', productData.price);
            
            // Clear the stored data after use
            localStorage.removeItem('selectedProduct');
        }
    });
}

// Fungsi untuk redirect ke halaman pembayaran
function redirectToPayment(productName, productPrice) {
    // Simpan data produk yang dipilih
    const productData = {
        name: productName,
        price: productPrice,
        date: new Date().toISOString()
    };
    
    // Simpan ke localStorage
    localStorage.setItem('selectedProduct', JSON.stringify(productData));
    
    // Redirect ke halaman pembayaran
    window.location.href = 'pembayaran.html';
}