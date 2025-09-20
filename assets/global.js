// Global JavaScript for Grind Nation Theme

document.addEventListener('DOMContentLoaded', function() {
  // Initialize cart functionality
  initializeCart();
  
  // Initialize search functionality
  initializeSearch();
  
  // Initialize wishlist functionality
  initializeWishlist();
});

// Cart functionality
function initializeCart() {
  const cartIcon = document.getElementById('cart-icon-bubble');
  const addToCartForms = document.querySelectorAll('.product-form');
  
  addToCartForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const button = this.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      
      // Show loading state
      button.textContent = 'Adding...';
      button.disabled = true;
      
      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        // Update cart count
        updateCartCount();
        
        // Show success message
        showNotification('Product added to cart!', 'success');
        
        // Reset button
        button.textContent = originalText;
        button.disabled = false;
      })
      .catch(error => {
        console.error('Error:', error);
        showNotification('Error adding product to cart', 'error');
        
        // Reset button
        button.textContent = originalText;
        button.disabled = false;
      });
    });
  });
}

// Update cart count
function updateCartCount() {
  fetch('/cart.js')
    .then(response => response.json())
    .then(cart => {
      const cartCount = document.querySelector('.cart-count');
      const cartIcon = document.getElementById('cart-icon-bubble');
      
      if (cart.item_count > 0) {
        if (cartCount) {
          cartCount.textContent = cart.item_count;
        } else {
          // Create cart count element if it doesn't exist
          const countElement = document.createElement('span');
          countElement.className = 'cart-count';
          countElement.textContent = cart.item_count;
          cartIcon.appendChild(countElement);
        }
      } else {
        if (cartCount) {
          cartCount.remove();
        }
      }
    })
    .catch(error => console.error('Error updating cart count:', error));
}

// Search functionality
function initializeSearch() {
  const searchInputs = document.querySelectorAll('.search-input');
  
  searchInputs.forEach(input => {
    input.addEventListener('input', debounce(function() {
      const query = this.value.trim();
      if (query.length > 2) {
        performSearch(query);
      }
    }, 300));
  });
}

// Debounce function for search
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Perform search (basic implementation)
function performSearch(query) {
  // This would typically integrate with Shopify's search API
  console.log('Searching for:', query);
}

// Wishlist functionality
function initializeWishlist() {
  const wishlistButtons = document.querySelectorAll('.wishlist-btn');
  
  wishlistButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.dataset.productId;
      toggleWishlist(productId, this);
    });
  });
}

// Toggle wishlist item
function toggleWishlist(productId, button) {
  let wishlist = JSON.parse(localStorage.getItem('grind-nation-wishlist') || '[]');
  const icon = button.querySelector('.icon path');
  
  if (wishlist.includes(productId)) {
    // Remove from wishlist
    wishlist = wishlist.filter(id => id !== productId);
    button.style.color = '#6b7280';
    showNotification('Removed from wishlist', 'info');
  } else {
    // Add to wishlist
    wishlist.push(productId);
    button.style.color = '#dc2626';
    showNotification('Added to wishlist', 'success');
  }
  
  localStorage.setItem('grind-nation-wishlist', JSON.stringify(wishlist));
}

// Show notification
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Style the notification
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '12px 24px',
    borderRadius: '6px',
    color: '#ffffff',
    fontWeight: '600',
    zIndex: '9999',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease',
    backgroundColor: type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#3b82f6'
  });
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Initialize wishlist on page load
document.addEventListener('DOMContentLoaded', function() {
  const wishlist = JSON.parse(localStorage.getItem('grind-nation-wishlist') || '[]');
  const wishlistButtons = document.querySelectorAll('.wishlist-btn');
  
  wishlistButtons.forEach(button => {
    const productId = button.dataset.productId;
    if (wishlist.includes(productId)) {
      button.style.color = '#dc2626';
    }
  });
});