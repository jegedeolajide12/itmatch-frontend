const form = document.getElementById('login-form');
const submitButton = document.getElementById('submit-button');
const passwordToggleButtons = Array.from(document.querySelectorAll('.password-toggle'));

function getActiveFieldIds() {
  return ['email', 'password'];
}

function isFormValid() {
  const activeFieldIds = getActiveFieldIds();

  for (const fieldId of activeFieldIds) {
    const input = document.getElementById(fieldId);
    if (!input || input.value.trim() === '') {
      return false;
    }
  }

  return true;
}

function updateSubmitState() {
  submitButton.disabled = !isFormValid();
}

function setPasswordVisibility(button, isVisible) {
  const closedIcon = button.querySelector('.eye-closed');
  const openIcon = button.querySelector('.eye-open');

  if (closedIcon) {
    closedIcon.classList.toggle('hidden', isVisible);
  }

  if (openIcon) {
    openIcon.classList.toggle('hidden', !isVisible);
  }

  button.setAttribute('aria-pressed', String(isVisible));
  button.setAttribute('aria-label', isVisible ? 'Hide password' : 'Show password');
}

passwordToggleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.target;
    const input = document.getElementById(targetId);

    if (!input) {
      return;
    }

    const shouldShow = input.type === 'password';
    input.type = shouldShow ? 'text' : 'password';
    setPasswordVisibility(button, shouldShow);
  });
});

form.addEventListener('input', updateSubmitState);

form.addEventListener('submit', (event) => {
  if (!isFormValid()) {
    event.preventDefault();
    updateSubmitState();
  }
});

updateSubmitState();
