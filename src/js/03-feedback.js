import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const saveFormState = () => {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const restoreFormState = () => {
  const savedData = localStorage.getItem('feedback-form-state');

  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
};

emailInput.addEventListener('input', throttle(saveFormState, 500));
messageTextarea.addEventListener('input', throttle(saveFormState, 500));

document.addEventListener('DOMContentLoaded', restoreFormState);

form.addEventListener('submit', e => {
  e.preventDefault();

  localStorage.removeItem('feedback-form-state');

  console.log('Form Data:', {
    email: emailInput.value,
    message: messageTextarea.value,
  });

  emailInput.value = '';
  messageTextarea.value = '';
});
