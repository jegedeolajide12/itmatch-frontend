let toastHost;

function ensureToastHost() {
  if (toastHost) {
    return toastHost;
  }

  toastHost = document.createElement('div');
  toastHost.id = 'toast-host';
  toastHost.className = 'pointer-events-none fixed left-1/2 top-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 flex-col gap-2 sm:top-6 sm:max-w-sm md:left-auto md:right-6 md:translate-x-0 md:max-w-md lg:max-w-lg';
  document.body.appendChild(toastHost);

  return toastHost;
}

export function showToast(message, options = {}) {
  const {
    type = 'info',
    duration = 2600,
  } = options;

  const host = ensureToastHost();
  const toast = document.createElement('div');

  const typeStyles = {
    success: 'bg-emerald-50 text-emerald-900 border border-emerald-200',
    error: 'bg-red-50 text-red-900 border border-red-200',
    warning: 'bg-amber-50 text-amber-900 border border-amber-200',
    info: 'bg-blue-50 text-blue-900 border border-blue-200',
  };

  toast.className = `pointer-events-auto rounded-lg px-5 py-3.5 text-sm font-semibold leading-snug text-center shadow-lg transition-all duration-300 ease-out sm:px-6 sm:py-4 sm:text-base ${typeStyles[type] || typeStyles.info}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.style.opacity = '0';
  toast.style.transform = 'translateY(-10px) scale(0.98)';
  toast.textContent = message;
  host.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0) scale(1)';
  });

  const hideToast = () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px) scale(0.98)';
    window.setTimeout(() => {
      toast.remove();
    }, 250);
  };

  window.setTimeout(hideToast, duration);
}