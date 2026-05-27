// Alert system with different panda animations
const alertTypes = {
  addToCart: {
    message: "Added to cart! 🛒",
    pandaAnimation: "panda-jump",
    cloudMessage: "Yay! Item added to cart! 🎉"
  },
  removeFromCart: {
    message: "Removed from cart! 👋",
    pandaAnimation: "panda-wave",
    cloudMessage: "Item removed from cart! Bye bye! 👋"
  },
  clearCart: {
    message: "Cart cleared! 🧹",
    pandaAnimation: "panda-wave",
    cloudMessage: "Cart cleared! Panda says bye! 👋"
  },
  couponApplied: {
    message: "Coupon applied! 🎉",
    pandaAnimation: "panda-jump",
    cloudMessage: "Yay! 10% discount applied! 🎉"
  },
  couponExpired: {
    message: "Coupon expired! 😢",
    pandaAnimation: "panda-sad",
    cloudMessage: "Oops, you have lost your coupon! 😢"
  }
};

function showAlert(type, callback = null) {
  const alertData = alertTypes[type];
  if (!alertData) return;

  // Create alert container if it doesn't exist
  let alertContainer = document.getElementById('alert-container');
  if (!alertContainer) {
    alertContainer = document.createElement('div');
    alertContainer.id = 'alert-container';
    document.body.appendChild(alertContainer);
  }

  // Create alert element
  const alert = document.createElement('div');
  alert.className = 'alert-modal';
  alert.innerHTML = `
    <div class="cloud-shape">
      <button class="close-modal" onclick="this.parentElement.parentElement.remove()">&times;</button>
      <div class="panda-area">
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" class="${alertData.pandaAnimation}">
          <ellipse cx="45" cy="55" rx="22" ry="20" fill="#fff" stroke="#1b3c3d" stroke-width="2"/>
          <ellipse cx="25" cy="40" rx="7" ry="8" fill="#1b3c3d"/>
          <ellipse cx="65" cy="40" rx="7" ry="8" fill="#1b3c3d"/>
          <ellipse cx="37" cy="58" rx="4" ry="5" fill="#1b3c3d"/>
          <ellipse cx="53" cy="58" rx="4" ry="5" fill="#1b3c3d"/>
          <ellipse cx="37" cy="60" rx="1.2" ry="1.5" fill="#fff"/>
          <ellipse cx="53" cy="60" rx="1.2" ry="1.5" fill="#fff"/>
          <ellipse cx="45" cy="65" rx="2.2" ry="1.2" fill="#1b3c3d"/>
          ${type === 'panda-sad' ? 
            '<path d="M40 70 Q45 65 50 70" stroke="#1b3c3d" stroke-width="1.5" fill="none"/>' :
            '<path d="M42 68 Q45 70 48 68" stroke="#1b3c3d" stroke-width="1.5" fill="none"/>'
          }
          ${type === 'panda-wave' ? 
            '<ellipse class="panda-hand" cx="65" cy="70" rx="5" ry="2.5" fill="#1b3c3d"/>' : ''
          }
        </svg>
      </div>
      <div class="cloud-message">${alertData.cloudMessage}</div>
      <div class="confetti"></div>
    </div>
  `;

  // Add to container
  alertContainer.appendChild(alert);

  // Show alert with animation
  setTimeout(() => alert.classList.add('show'), 10);

  // Add confetti if it's a positive alert
  if (type === 'addToCart' || type === 'couponApplied') {
    showConfetti(alert.querySelector('.confetti'));
  }

  // Add wave animation if it's a wave panda
  if (type === 'panda-wave') {
    setTimeout(() => {
      const hand = alert.querySelector('.panda-hand');
      if (hand) hand.classList.add('wave-hand');
    }, 200);
  }

  // Auto remove after delay
  setTimeout(() => {
    alert.classList.remove('show');
    setTimeout(() => {
      alert.remove();
      if (callback) callback();
    }, 300);
  }, 2000);
}

function showConfetti(container) {
  container.innerHTML = '';
  for (let i = 0; i < 24; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left = (Math.random() * 90 + 5) + '%';
    el.style.background = ['#e3d18a','#fffbe6','#1b3c3d','#f7c873'][i%4];
    el.style.animationDelay = (Math.random() * 0.5) + 's';
    container.appendChild(el);
  }
} 