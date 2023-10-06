import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('[name="email"]');
const messageInput = form.querySelector('[name="message"]');
const storageKey = 'feedback-form-state';

// Функція, яка зберігає стан форми у локальному сховищі
function saveFormState() {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.setItem(storageKey, JSON.stringify(formData));
}

// Відстежуємо подію input на полях форми
emailInput.addEventListener('input', throttle(saveFormState, 500));
messageInput.addEventListener('input', throttle(saveFormState, 500));

// Під час завантаження сторінки перевіряємо стан сховища і заповнюємо поля форми
window.addEventListener('load', () => {
  const storedData = localStorage.getItem(storageKey);

  if (storedData) {
    const formData = JSON.parse(storedData);
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
});

// Відстежуємо подію submit форми
form.addEventListener('submit', event => {
  event.preventDefault();

  // Очищуємо сховище та поля форми
  localStorage.removeItem(storageKey);
  emailInput.value = '';
  messageInput.value = '';

  // Виводимо об'єкт з полями email і message у консоль
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(formData);
});
