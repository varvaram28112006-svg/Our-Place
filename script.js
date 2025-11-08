document.addEventListener('DOMContentLoaded', function() {
    const colorCircles = document.querySelectorAll('.color-circle');
    const carousel = document.getElementById('productCarousel');
    
    if (carousel) {
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: false
        });
        
        colorCircles.forEach(circle => {
            circle.addEventListener('click', function() {
                const color = this.getAttribute('data-color');
                
                colorCircles.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                
                const slideIndex = parseInt(color) - 1;
                carouselInstance.to(slideIndex);
            });
        });
        
        carousel.addEventListener('slid.bs.carousel', function(event) {
            const activeIndex = event.to;
            const activeColor = activeIndex + 1;
            
            colorCircles.forEach(c => c.classList.remove('active'));
            const targetCircle = document.querySelector(`.color-circle[data-color="${activeColor}"]`);
            if (targetCircle) {
                targetCircle.classList.add('active');
            }
        });
    }

    const ratingForm = document.getElementById('ratingForm');
    const successToast = document.getElementById('successToast');
    
    const toast = new bootstrap.Toast(successToast, {
        autohide: true,
        delay: 5000
    });
    
    if (ratingForm) {
        ratingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userName = document.getElementById('userName').value;
            const userEmail = document.getElementById('userEmail').value;
            const userComment = document.getElementById('userComment').value;
            const selectedRating = document.querySelector('input[name="rating"]:checked');
            
            if (!selectedRating) {
                alert('Please select a rating');
                return;
            }
            
            const ratingValue = selectedRating.value;
            
            console.log('Rating submitted:', {
                name: userName,
                email: userEmail,
                rating: ratingValue,
                comment: userComment
            });
            
            toast.show();
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('rateUsModal'));
            modal.hide();
            
            ratingForm.reset();
            
            resetStars();
        });
    }
    
    const starLabels = document.querySelectorAll('.star-label');
    starLabels.forEach(label => {
        label.addEventListener('mouseenter', function() {
            const rating = this.previousElementSibling.value;
            highlightStars(rating);
        });
        
        label.addEventListener('mouseleave', function() {
            const selected = document.querySelector('input[name="rating"]:checked');
            if (selected) {
                highlightStars(selected.value);
            } else {
                resetStars();
            }
        });
    });
    
    function highlightStars(rating) {
        const stars = document.querySelectorAll('.star-label');
        stars.forEach(star => {
            star.style.color = '#ddd';
        });
        
        for (let i = 0; i < rating; i++) {
            stars[stars.length - 1 - i].style.color = '#ffc107';
        }
    }
    
    function resetStars() {
        const stars = document.querySelectorAll('.star-label');
        stars.forEach(star => {
            star.style.color = '#ddd';
        });
    }
});