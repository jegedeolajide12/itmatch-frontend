import { showToast } from './toast.js';

const form = document.getElementById('signup-form');
const submitButton = document.getElementById('submit-button');
const roleButtons = Array.from(document.querySelectorAll('.role-button'));
const passwordToggleButtons = Array.from(document.querySelectorAll('.password-toggle'));
const studentFields = document.getElementById('student-fields');
const companyFields = document.getElementById('company-fields');

let currentRole = 'student';

function setRole(role) {
  currentRole = role;

  roleButtons.forEach((button) => {
    const isSelected = button.dataset.role === role;
    button.setAttribute('aria-pressed', String(isSelected));

        if (isSelected) {
          button.classList.remove('border-secondary-200', 'bg-tertiary-50', 'text-secondary-500');
          button.classList.add('border-primary', 'bg-primary', 'text-white');
    } else {
          button.classList.remove('border-primary', 'bg-primary', 'text-white');
          button.classList.add('border-secondary-200', 'bg-tertiary-50', 'text-secondary-500');
    }
  });

  if (role === 'student') {
    studentFields.classList.remove('hidden');
    companyFields.classList.add('hidden');
  } else {
    companyFields.classList.remove('hidden');
    studentFields.classList.add('hidden');
  }

  updateSubmitState();
}

function getActiveFieldIds() {
  if (currentRole === 'student') {
    return ['fullName', 'email', 'matricNumber', 'school', 'course', 'password', 'confirmPassword'];
  }

  return ['companyName', 'industry', 'companyEmail', 'companyPassword', 'companyConfirmPassword'];
}

function isFormValid() {
  const activeFieldIds = getActiveFieldIds();

  for (const fieldId of activeFieldIds) {
    const input = document.getElementById(fieldId);
    if (!input || input.value.trim() === '') {
      return false;
    }
  }

  const password = currentRole === 'student'
    ? document.getElementById('password').value
    : document.getElementById('companyPassword').value;

  const confirmPassword = currentRole === 'student'
    ? document.getElementById('confirmPassword').value
    : document.getElementById('companyConfirmPassword').value;

  if (password !== confirmPassword) {
    return false;
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

roleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setRole(button.dataset.role);
  });
});

form.addEventListener('input', updateSubmitState);

form.addEventListener('submit', (event) => {
  if (!isFormValid()) {
    event.preventDefault();
    updateSubmitState();
    showToast('Please complete all fields and confirm matching passwords.', { type: 'error' });
    return;
  }

  event.preventDefault();
  showToast('Account created. Redirecting to login...', { type: 'success' });
  window.setTimeout(() => {
    window.location.href = './login.html';
  }, 1000);
});

setRole('student');
