import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

// Функція для збереження стану форми у локальному сховищі
const saveFormState = () => {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

// Функція для відновлення стану форми з локального сховища
const restoreFormState = () => {
  const savedData = localStorage.getItem('feedback-form-state');

  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
};

// Додайте обробники подій для полів форми, використовуючи throttle
emailInput.addEventListener('input', throttle(saveFormState, 500));
messageTextarea.addEventListener('input', throttle(saveFormState, 500));

// Відновіть стан форми під час завантаження сторінки
document.addEventListener('DOMContentLoaded', restoreFormState);

// Додайте обробник події submit для форми
form.addEventListener('submit', e => {
  e.preventDefault();

  // Очистіть локальне сховище
  localStorage.removeItem('feedback-form-state');

  // Виведіть дані форми у консоль
  console.log('Form Data:', {
    email: emailInput.value,
    message: messageTextarea.value,
  });

  // Очистіть поля форми
  emailInput.value = '';
  messageTextarea.value = '';
});
