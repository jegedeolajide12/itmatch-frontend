const modal = document.getElementById('signout-modal');
const openButton = document.getElementById('open-signout-modal');
const cancelButton = document.getElementById('cancel-signout');
const confirmButton = document.getElementById('confirm-signout');

function openModal() {
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeModal() {
  modal.classList.remove('flex');
  modal.classList.add('hidden');
}

openButton.addEventListener('click', openModal);
cancelButton.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('flex')) {
    closeModal();
  }
});

confirmButton.addEventListener('click', () => {
  window.location.href = './login.html';
});
