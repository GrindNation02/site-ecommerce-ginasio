// PubSub system for Grind Nation Theme

window.PubSub = (function() {
  const events = {};

  function subscribe(eventName, callback) {
    if (!events[eventName]) {
      events[eventName] = [];
    }
    events[eventName].push(callback);
    
    return function unsubscribe() {
      events[eventName] = events[eventName].filter(cb => cb !== callback);
    };
  }

  function publish(eventName, data) {
    if (!events[eventName]) {
      return;
    }
    
    events[eventName].forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event callback for ${eventName}:`, error);
      }
    });
  }

  return {
    subscribe,
    publish
  };
})();

// Common events
window.PubSub.subscribe('cart:updated', function(cart) {
  console.log('Cart updated:', cart);
});

window.PubSub.subscribe('product:added-to-cart', function(product) {
  console.log('Product added to cart:', product);
});

window.PubSub.subscribe('wishlist:updated', function(wishlist) {
  console.log('Wishlist updated:', wishlist);
});