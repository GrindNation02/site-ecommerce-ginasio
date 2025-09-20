// Constants for Grind Nation Theme

window.theme = window.theme || {};

// Theme configuration
window.theme.config = {
  cartType: 'drawer',
  enableQuickView: true,
  enableWishlist: true,
  enableSearch: true,
  currency: {
    format: '${{amount}}'
  }
};

// API endpoints
window.theme.routes = {
  cart: '/cart',
  cartAdd: '/cart/add',
  cartChange: '/cart/change',
  cartClear: '/cart/clear',
  search: '/search'
};

// Strings for internationalization
window.theme.strings = {
  addToCart: 'Add to Cart',
  soldOut: 'Sold Out',
  unavailable: 'Unavailable',
  addedToCart: 'Added to cart',
  addToWishlist: 'Add to Wishlist',
  removeFromWishlist: 'Remove from Wishlist',
  quickView: 'Quick View',
  loading: 'Loading...',
  error: 'Something went wrong. Please try again.',
  searchPlaceholder: 'Search products...',
  noResults: 'No results found',
  cartEmpty: 'Your cart is empty',
  cartError: 'There was an error updating your cart'
};

// Breakpoints for responsive design
window.theme.breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1200
};

// Animation settings
window.theme.animations = {
  duration: 300,
  easing: 'ease-in-out'
};