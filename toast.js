// Toast Notification System
class ToastNotification {
  constructor() {
    this.container = this.createContainer();
  }

  createContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed top-4 right-4 z-50 space-y-2';
    container.style.cssText = 'max-width: 300px;';
    document.body.appendChild(container);
    return container;
  }

  show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-exclamation-circle',
      warning: 'fa-exclamation-triangle',
      info: 'fa-info-circle'
    };
    
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500'
    };

    toast.className = `${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slideIn transform transition-all`;
    toast.innerHTML = `
      <i class="fas ${icons[type]} text-xl"></i>
      <span class="flex-1">${message}</span>
      <button class="hover:opacity-75" onclick="this.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, duration);

    return toast;
  }

  success(message, duration) {
    return this.show(message, 'success', duration);
  }

  error(message, duration) {
    return this.show(message, 'error', duration);
  }

  warning(message, duration) {
    return this.show(message, 'warning', duration);
  }

  info(message, duration) {
    return this.show(message, 'info', duration);
  }
}

// Initialize toast system
window.toast = new ToastNotification();

// Add CSS for toast animations
const toastStyles = document.createElement('style');
toastStyles.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .animate-slideIn {
    animation: slideIn 0.3s ease-out;
  }
  
  #toast-container > div {
    transition: all 0.3s ease-out;
  }
`;
document.head.appendChild(toastStyles);
